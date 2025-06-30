import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import FuncionariosResults from "./FuncionariosResults";
import FuncionariosForm from "./FuncionariosForm";
import FuncionarioDetalhes from "./FuncionarioDetalhes.jsx";
import CargoSelect from "../selects/CargoSelect.jsx";

import {
	deletarFuncionario,
	pesquisarFuncionarios,
} from "../../services/api/funcionarios";

import { useState } from "react";

const initialState = {
	cargo: "",
	funcionario: "",
};

const FuncionariosManager = () => {
	const [formData, setFormData] = useState(initialState);
	const [results, setResults] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [currentFuncionario, setCurrentFuncionario] = useState(null);

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
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<>
			<div className="flex flex-row border-b-3 border-indigo-900 pb-6 pt-4 mb-9">
				<form
					className="flex flex-row gap-3 w-min px-6"
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
					<button
						className="bg-indigo-500 hover:bg-indigo-600 px-3 h-8 mt-auto"
						type="submit"
					>
						Pesquisar
					</button>
				</form>
				<div className="flex flex-row gap-3 w-full px-6">
					<Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
						<Dialog.Trigger
							className="bg-indigo-500 hover:bg-indigo-600 px-3 h-8 mt-auto ml-auto"
							type="button"
						>
							Cadastrar Funcionário
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
							<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
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
			{results && (
				<FuncionariosResults
					results={results}
					deleteAction={deleteAction}
					setModalContent={(funcionario) => {
						setCurrentFuncionario(funcionario);
						setModalOpen(true);
					}}
					handleViewDetails={handleViewDetails}
				/>
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
