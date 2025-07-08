import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import BulkFaltasForm from "./BulkFaltasForm";
import FaltasResults from "./FaltasResults";
import FaltasForm from "./FaltasForm";

import { deletarFalta, pesquisarFaltas } from "../../services/api/faltas";

import { useLoading } from "../../contexts/LoadingContext.jsx";
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
	const [actionType, setActionType] = useState("single");

	const { startLoading, stopLoading } = useLoading();

	const handleOpenModal = (type) => {
		return () => {
			setActionType(type);
			setModalOpen(true);
		};
	};

	const deleteAction = async (id) => {
		if (!id) return;
		startLoading(10000);
		await deletarFalta(id);
		setResults((prev) => prev.filter((item) => item.id !== id));
		stopLoading();
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
		startLoading(10000);
		const resultados = await pesquisarFaltas(formData);
		setResults(resultados);
		stopLoading();
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
					<div className="grid grid-cols-2 gap-3 md:flex md:flex-row">
						<div className="mr-4 md:mr-0">
							<p className="font-bold mb-1">Data Inicial:</p>
							<Input
								name="dataInicial"
								className="bg-indigo-50 w-full px-2 py-1 text-black"
								type="date"
								value={formData.dataInicial}
								onChange={handleChange}
							/>
						</div>
						<div className="mr-4 md:mr-0">
							<p className="font-bold mb-1">Data Final:</p>
							<Input
								name="dataFinal"
								className="bg-indigo-50 w-full px-2 py-1 text-black"
								type="date"
								value={formData.dataFinal}
								onChange={handleChange}
							/>
						</div>
					</div>
					<button
						className="bg-indigo-500 hover:bg-indigo-600 px-3 h-8 md:mt-auto mt-3"
						type="submit"
					>
						Pesquisar
					</button>
				</form>
				<div className="flex flex-row gap-3 w-full px-6 pt-6 mt-6 md:mt-0 md:pt-0 border-t-3 md:border-t-0 border-indigo-900">
					<button
						onClick={handleOpenModal("single")}
						className="bg-indigo-500 hover:bg-indigo-600 px-3 w-full py-1 md:h-8 md:mt-auto md:ml-auto"
						type="button"
					>
						Cadastrar Falta
					</button>
					<button
						onClick={handleOpenModal("bulk")}
						className="bg-indigo-500 hover:bg-indigo-600 px-3 w-full py-1 md:h-8 md:mt-auto md:ml-auto"
						type="button"
					>
						Frequência Diária
					</button>
					<Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
							<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
								{actionType === "single" && (
									<FaltasForm
										closeModal={() => setModalOpen(false)}
										currentFalta={currentFalta}
										clearFalta={() => setCurrentFalta(null)}
										updateAction={updateAction}
										clearResults={() => setResults([])}
									/>
								)}
								{actionType === "bulk" && (
									<BulkFaltasForm
										closeModal={() => setModalOpen(false)}
										clearResults={() => setResults([])}
									/>
								)}
							</Dialog.Popup>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</div>
			{results && (
				<div className="xl:px-0 px-2">
					<FaltasResults
						results={results}
						setModalContent={(falta) => {
							setCurrentFalta(falta);
							setModalOpen(true);
						}}
						deleteAction={deleteAction}
					/>
				</div>
			)}
		</>
	);
};

export default FaltasManager;
