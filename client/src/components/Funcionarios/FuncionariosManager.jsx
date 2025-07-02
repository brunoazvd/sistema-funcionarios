import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import FuncionariosResults from "./FuncionariosResults";
import FuncionariosForm from "./FuncionariosForm";
import FuncionarioDetalhes from "./FuncionarioDetalhes.jsx";
import CargoSelect from "../selects/CargoSelect.jsx";

import { useLoading } from "../../contexts/LoadingContext.jsx";

import {
	deletarFuncionario,
	pesquisarFuncionarios,
} from "../../services/api/funcionarios";

import { useState } from "react";

const initialState = {
	cargo: "",
	funcionario: "",
	incluirInativos: false,
};

const FuncionariosManager = () => {
	const [formData, setFormData] = useState(initialState);
	const [results, setResults] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [currentFuncionario, setCurrentFuncionario] = useState(null);

	const { startLoading, stopLoading } = useLoading();

	const deleteAction = async (id) => {
		if (!id) return;
		await deletarFuncionario(id);
		setResults((prev) => prev.filter((item) => item.id !== id));
	};

	const updateAction = async (updatedFuncionario) => {
		if (!updatedFuncionario) return;
		setResults((prev) =>
			prev.map((item) =>
				item.id === updatedFuncionario.id ? updatedFuncionario : item
			)
		);
	};

	const handleViewDetails = async (funcionario) => {
		setCurrentFuncionario(funcionario);
		setDetailsOpen(true);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const resultados = await pesquisarFuncionarios(formData);
		setResults(resultados);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "incluirInativos") {
			setFormData({
				...formData,
				[name]: JSON.parse(value),
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	return (
		<>
			<div className="flex flex-col md:flex-row border-b-3 border-indigo-900 pb-6 pt-4 mb-9">
				<form
					className="flex flex-col md:flex-row gap-3 md:w-min px-6"
					onSubmit={handleSubmit}
				>
					<div>
						<p className="font-bold mb-1">Funcionário:</p>
						<Input
							name="funcionario"
							className="bg-indigo-50 w-full min-w-64 px-2 py-1 text-black"
							type="text"
							value={formData.funcionario}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p className="font-bold mb-1">Cargo:</p>
						<CargoSelect
							value={formData.cargo}
							handleChange={handleChange}
							name="cargo"
						/>
					</div>
					<div className="min-w-32">
						<p className="font-bold mb-1 mr-2">Incluir Inativos?</p>
						<select
							name="incluirInativos"
							className="bg-indigo-50 w-full text-black  py-1 px-2"
							value={formData.incluirInativos}
							onChange={handleChange}
						>
							<option value={false}>Não</option>
							<option value={true}>Sim</option>
						</select>
					</div>
					<button
						className="bg-indigo-500 hover:bg-indigo-600 px-3 h-8 md:mt-auto mt-3"
						type="submit"
					>
						Pesquisar
					</button>
				</form>
				<div className="flex flex-row gap-3 w-full px-6 pt-6 mt-6 md:mt-0 md:pt-0 border-t-3 md:border-t-0 border-indigo-900">
					<Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
						<Dialog.Trigger
							className="bg-indigo-500 hover:bg-indigo-600 px-3 w-full py-1 md:h-8 md:mt-auto md:ml-auto"
							type="button"
						>
							Cadastrar Funcionário
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
							<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
								<FuncionariosForm
									closeModal={() => setModalOpen(false)}
									currentFuncionario={currentFuncionario}
									clearFuncionario={() =>
										setCurrentFuncionario(null)
									}
									updateAction={updateAction}
									clearResults={() => setResults([])}
								/>
							</Dialog.Popup>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</div>
			<div onClick={() => startLoading(3000)}>Testar Loading</div>
			{results && (
				<div className="px-2 xl:px-0">
					<FuncionariosResults
						results={results}
						deleteAction={deleteAction}
						setModalContent={(funcionario) => {
							setCurrentFuncionario(funcionario);
							setModalOpen(true);
						}}
						handleViewDetails={handleViewDetails}
					/>
				</div>
			)}
			{currentFuncionario && (
				<FuncionarioDetalhes
					funcionarioId={currentFuncionario.id}
					funcionarioNome={currentFuncionario.nome}
					isOpen={detailsOpen}
					onClose={() => setDetailsOpen(false)}
				/>
			)}
		</>
	);
};

export default FuncionariosManager;
