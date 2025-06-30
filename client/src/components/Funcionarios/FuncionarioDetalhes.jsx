import { useState, useEffect } from "react";
import { Tabs } from "@base-ui-components/react/tabs";
import { Dialog } from "@base-ui-components/react/dialog";
import { buscarFaltasPorFuncionarioId } from "../../services/api/faltas";
import { buscarAtestadosPorFuncionarioId } from "../../services/api/atestados";
import FaltasDetalhesResults from "../Faltas/FaltasDetalhesResults";
import AtestadosDetalhesResults from "../Atestados/AtestadosDetalhesResults";

const FuncionarioDetalhes = ({
	funcionarioId,
	funcionarioNome,
	isOpen,
	onClose,
	setModalOpen,
}) => {
	const [faltas, setFaltas] = useState([]);
	const [atestados, setAtestados] = useState([]);

	console.log(funcionarioId);

	console.log("faltas", faltas);
	console.log("atestados", atestados);

	useEffect(() => {
		if (funcionarioId && isOpen) {
			loadData();
		}
	}, [funcionarioId, isOpen]);

	const loadData = async () => {
		const faltasData = await buscarFaltasPorFuncionarioId(
			Number(funcionarioId)
		);
		const atestadosData = await buscarAtestadosPorFuncionarioId(
			Number(funcionarioId)
		);
		setFaltas(faltasData);
		setAtestados(atestadosData);
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
				<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-2xl max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
					<Dialog.Title className="text-xl font-medium mb-4">
						Faltas e Atestados de:{" "}
						<span className="font-bold">{funcionarioNome}</span>
					</Dialog.Title>
					<Tabs.Root defaultValue="faltas">
						<Tabs.List className="flex border-b border-indigo-300 mb-4">
							<Tabs.Tab
								className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
								value="faltas"
							>
								Faltas
							</Tabs.Tab>
							<Tabs.Tab
								className="px-4 py-2 border-b-2 border-transparent data-[selected]:border-indigo-500 data-[selected]:text-indigo-700"
								value="atestados"
							>
								Atestados
							</Tabs.Tab>
						</Tabs.List>
						<Tabs.Panel value="faltas">
							<FaltasDetalhesResults
								results={faltas}
								deleteAction={async (id) => {
									// Implementar exclusão e atualizar lista
								}}
							/>
						</Tabs.Panel>
						<Tabs.Panel value="atestados">
							<AtestadosDetalhesResults
								results={atestados}
								deleteAction={async (id) => {
									// Implementar exclusão e atualizar lista
								}}
							/>
						</Tabs.Panel>
					</Tabs.Root>
					<div className="mt-4 flex justify-end">
						<button
							className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-white rounded"
							onClick={onClose}
						>
							Fechar
						</button>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default FuncionarioDetalhes;
