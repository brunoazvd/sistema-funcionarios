import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import FaltasResults from "./FaltasResults";
import FaltasForm from "./FaltasForm";

import { deletarFalta, pesquisarFaltas } from "../../services/api/faltas";

import { useState } from "react";

const initialState = {
	dataInicial: "",
	dataFinal: "",
	funcionario: "",
};

const FaltasManager = () => {
	const [formData, setFormData] = useState(initialState);
	const [results, setResults] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentFalta, setCurrentFalta] = useState(null);

	const deleteAction = async (id) => {
		if (!id) return;
		await deletarFalta(id);
		setResults((prev) => prev.filter((item) => item.id !== id));
	};

	const updateAction = async (updatedFalta) => {
		if (!updatedFalta) return;
		setResults((prev) =>
			prev.map((item) =>
				item.id === updatedFalta.id ? updatedFalta : item
			)
		);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const resultados = await pesquisarFaltas(formData);
		setResults(resultados);
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
						<p className="font-bold mb-1">Data Inicial:</p>
						<Input
							name="dataInicial"
							className="bg-indigo-50 w-full px-2 py-1 text-black"
							type="date"
							value={formData.dataInicial}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p className="font-bold mb-1">Data Final:</p>
						<Input
							name="dataFinal"
							className="bg-indigo-50 w-full px-2 py-1 text-black"
							type="date"
							value={formData.dataFinal}
							onChange={handleChange}
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
							Cadastrar Falta
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
							<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
								<FaltasForm
									closeModal={() => setModalOpen(false)}
									currentFalta={currentFalta}
									clearFalta={() => setCurrentFalta(null)}
									updateAction={updateAction}
									clearResults={() => setResults([])}
								/>
							</Dialog.Popup>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</div>
			{results && (
				<FaltasResults
					results={results}
					setModalContent={(falta) => {
						setCurrentFalta(falta);
						setModalOpen(true);
					}}
					deleteAction={deleteAction}
				/>
			)}
		</>
	);
};

export default FaltasManager;
