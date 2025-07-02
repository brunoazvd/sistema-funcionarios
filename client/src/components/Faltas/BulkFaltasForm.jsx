import {
	cadastrarFalta,
	deletarFalta,
	pesquisarFaltas,
} from "../../services/api/faltas";

import { useState } from "react";
import { useFuncionarios } from "../../contexts/FuncionariosContext.jsx";

import FaltasCategoriaTable from "./FaltasCategoriaTable";

import { Tabs } from "@base-ui-components/react/tabs";

const categorias = {
	SECRETARIA: [
		"AUXILIAR_SECRETARIA",
		"SECRETARIO",
		"DIRETOR",
		"DIRETOR_ADJUNTO",
		"ORIENTADOR_EDUCACIONAL",
		"ORIENTADOR_PEDAGOGICO",
		"INSPETOR_ESCOLAR",
		"PEDAGOGO_NAE",
		"DIRIGENTE_TURNO",
	],
	PROFESSOR: ["PROFESSOR"],
	APOIO: [
		"INSPETOR_DE_ALUNOS",
		"VIGIA",
		"COZINHEIRO",
		"AUXILIAR_DE_SERVICOS_GERAIS",
	],
	MONITOR: ["MONITOR_DE_ALUNOS"],
};

const BulkFaltasForm = () => {
	const { funcionarios } = useFuncionarios();

	const [dataFalta, setDataFalta] = useState("");
	const [initialFaltasState, setInitialFaltasState] = useState(null);
	const [currentFaltasState, setCurrentFaltasState] = useState(null);
	const [existingFaltas, setExistingFaltas] = useState([]);

	const handleSearch = async () => {
		if (!dataFalta || dataFalta.length !== 10) return;

		const resultados = await pesquisarFaltas({
			dataInicial: dataFalta,
			dataFinal: dataFalta,
		});

		setExistingFaltas(resultados);

		const initialState = funcionarios.map((funcionario) => {
			return {
				funcionarioId: funcionario.id,
				temFalta: resultados.some(
					(falta) => falta.funcionarioId === funcionario.id
				),
			};
		});

		setInitialFaltasState(initialState);
		setCurrentFaltasState(initialState);
	};

	const handleSave = async () => {
		if (!dataFalta || dataFalta.length !== 10) return;

		// Encontrar funcionários que não tinham falta antes, mas agora têm (criar falta)
		const faltasParaCadastrar = await currentFaltasState.filter(
			(current) =>
				current.temFalta &&
				!initialFaltasState.find(
					(initial) => initial.funcionarioId === current.funcionarioId
				)?.temFalta
		);

		// Encontrar funcionários que tinham falta antes, mas agora não têm (deletar falta)
		const faltasParaDeletar = await initialFaltasState.filter(
			(initial) =>
				initial.temFalta &&
				!currentFaltasState.find(
					(current) => current.funcionarioId === initial.funcionarioId
				)?.temFalta
		);

		// Criando faltas que devem ser criadas
		for (const faltaParaCadastrar of faltasParaCadastrar) {
			console.log(
				`Cadastrando falta para ${faltaParaCadastrar.funcionarioId} em ${dataFalta}`
			);
			await cadastrarFalta({
				funcionarioId: Number(faltaParaCadastrar.funcionarioId),
				data: new Date(dataFalta),
				observacao: null,
			});
		}

		// Deletando faltas que deveriam ser deletadas
		if (faltasParaDeletar.length > 0) {
			for (const faltaParaDeletar of faltasParaDeletar) {
				const falta = existingFaltas.find(
					(falta) =>
						falta.funcionarioId === faltaParaDeletar.funcionarioId
				);
				console.log(
					`Deletando falta ${falta.id} para ${faltaParaDeletar.funcionarioId} em ${dataFalta}`
				);
				await deletarFalta(falta.id);
			}
		}

		console.log("novas faltas", faltasParaCadastrar);
		console.log("excluir", faltasParaDeletar);

		setInitialFaltasState(currentFaltasState);
	};

	return (
		<div>
			<p className="text-center text-xl -mt-1.5 mb-6 font-bold tracking-wide">
				Frequência Diária
			</p>
			<div className="grid grid-cols-2 gap-3 mb-6">
				<div>
					<p className="font-medium mb-1">Selecione um Dia:</p>
					<input
						name="dataFalta"
						className="bg-indigo-50 w-full px-2 py-1"
						type="date"
						value={dataFalta}
						onChange={(event) => setDataFalta(event.target.value)}
						required
					/>
				</div>
				<div className="mt-auto">
					<button
						className="bg-indigo-300 hover:bg-indigo-400 px-4 py-1 w-full "
						type="button"
						onClick={handleSearch}
					>
						Buscar Faltas
					</button>
				</div>
			</div>
			{initialFaltasState !== null && (
				<Tabs.Root defaultValue="secretaria">
					<Tabs.List className="flex mb-4">
						<Tabs.Tab
							className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
							value="secretaria"
						>
							Secretaria
						</Tabs.Tab>
						<Tabs.Tab
							className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
							value="professor"
						>
							Professores
						</Tabs.Tab>
						<Tabs.Tab
							className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
							value="apoio"
						>
							Apoio
						</Tabs.Tab>
						<Tabs.Tab
							className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
							value="monitor"
						>
							Monitores
						</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="secretaria">
						<FaltasCategoriaTable
							funcionarios={funcionarios}
							categoriaCargos={categorias.SECRETARIA}
							currentFaltasState={currentFaltasState}
							setCurrentFaltasState={setCurrentFaltasState}
						/>
					</Tabs.Panel>
					<Tabs.Panel value="professor">
						<div className="flex flex-col gap-3 mb-6">
							<FaltasCategoriaTable
								funcionarios={funcionarios}
								categoriaCargos={categorias.PROFESSOR}
								currentFaltasState={currentFaltasState}
								setCurrentFaltasState={setCurrentFaltasState}
							/>
						</div>
					</Tabs.Panel>
					<Tabs.Panel value="apoio">
						<div className="flex flex-col gap-3 mb-6">
							<FaltasCategoriaTable
								funcionarios={funcionarios}
								categoriaCargos={categorias.APOIO}
								currentFaltasState={currentFaltasState}
								setCurrentFaltasState={setCurrentFaltasState}
							/>
						</div>
					</Tabs.Panel>
					<Tabs.Panel value="monitor">
						<div className="flex flex-col gap-3 mb-6">
							<FaltasCategoriaTable
								funcionarios={funcionarios}
								categoriaCargos={categorias.MONITOR}
								currentFaltasState={currentFaltasState}
								setCurrentFaltasState={setCurrentFaltasState}
							/>
						</div>
					</Tabs.Panel>
				</Tabs.Root>
			)}
			<div className="flex flex-col gap-3 mb-6">
				<button
					className="bg-indigo-300 hover:bg-indigo-400 px-4 py-1 w-full "
					type="button"
					onClick={handleSave}
				>
					Salvar Faltas
				</button>
			</div>
		</div>
	);
};

export default BulkFaltasForm;
