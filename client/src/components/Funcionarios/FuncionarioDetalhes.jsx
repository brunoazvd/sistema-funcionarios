import { useState, useEffect } from "react";

import { Tabs } from "@base-ui-components/react/tabs";
import { Dialog } from "@base-ui-components/react/dialog";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";

import { buscarFaltasPorFuncionarioId } from "../../services/api/faltas";
import { buscarAtestadosPorFuncionarioId } from "../../services/api/atestados";

import FaltasDetalhesResults from "../Faltas/FaltasDetalhesResults";
import AtestadosDetalhesResults from "../Atestados/AtestadosDetalhesResults";
import AtestadosForm from "../Atestados/AtestadosForm";
import FaltasForm from "../Faltas/FaltasForm";

import { deletarFalta } from "../../services/api/faltas";
import { deletarAtestado } from "../../services/api/atestados";

const FuncionarioDetalhes = ({
	funcionarioId,
	funcionarioNome,
	isOpen,
	onClose,
}) => {
	const [faltas, setFaltas] = useState([]);
	const [atestados, setAtestados] = useState([]);
	const [faltaModalOpen, setFaltaModalOpen] = useState(false);
	const [atestadoModalOpen, setAtestadoModalOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [currentFalta, setCurrentFalta] = useState(null);
	const [currentAtestado, setCurrentAtestado] = useState(null);
	const [deleteId, setDeleteId] = useState(0);
	const [alertType, setAlertType] = useState("falta");

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

	const handleDeleteFalta = async (id) => {
		await deletarFalta(id);
		setFaltas(faltas.filter((falta) => falta.id !== id));
	};

	const handleDeleteAtestado = async (id) => {
		await deletarAtestado(id);
		setAtestados(atestados.filter((atestado) => atestado.id !== id));
	};

	const handleUpdateFalta = (updatedFalta) => {
		setFaltas((prev) =>
			prev.map((item) =>
				item.id === updatedFalta.id ? updatedFalta : item
			)
		);
	};

	const handleUpdateAtestado = (updatedAtestado) => {
		setAtestados((prev) =>
			prev.map((item) =>
				item.id === updatedAtestado.id ? updatedAtestado : item
			)
		);
	};

	const handleOpenAlert = (id, type) => {
		setDeleteId(id);
		setAlertType(type);
		setAlertOpen(true);
	};

	return (
		<>
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
									handleOpenAlert={handleOpenAlert}
									alertType="falta"
									setModalContent={(falta) => {
										setCurrentFalta(falta);
										setFaltaModalOpen(true);
									}}
								/>
							</Tabs.Panel>
							<Tabs.Panel value="atestados">
								<AtestadosDetalhesResults
									results={atestados}
									handleOpenAlert={handleOpenAlert}
									alertType="atestado"
									setModalContent={(atestado) => {
										setCurrentAtestado(atestado);
										setAtestadoModalOpen(true);
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
			{/* Modal de edição de Faltas */}
			<Dialog.Root open={faltaModalOpen} onOpenChange={setFaltaModalOpen}>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50 z-60" />
					<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 z-70">
						<FaltasForm
							closeModal={() => setFaltaModalOpen(false)}
							currentFalta={currentFalta}
							clearFalta={() => setCurrentFalta(null)}
							updateAction={handleUpdateFalta}
							clearResults={() => {}}
						/>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>

			{/* Modal de edição de Atestados */}
			<Dialog.Root
				open={atestadoModalOpen}
				onOpenChange={setAtestadoModalOpen}
			>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50 z-60" />
					<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 z-70">
						<AtestadosForm
							closeModal={() => setAtestadoModalOpen(false)}
							currentAtestado={currentAtestado}
							clearAtestado={() => setCurrentAtestado(null)}
							updateAction={handleUpdateAtestado}
							clearResults={() => {}}
						/>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>

			{/* Modal de confirmação de exclusão de Faltas e Atestados */}
			<AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
				<AlertDialog.Portal>
					<AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
					<AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-sm max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
						<AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
							Excluir{" "}
							{alertType === "falta" ? "Falta" : "Atestado"}?
						</AlertDialog.Title>
						<AlertDialog.Description className="mb-6 text-base text-gray-600">
							Você não pode desfazer esta ação!
						</AlertDialog.Description>
						<div className="flex justify-end gap-3">
							<AlertDialog.Close className="rounded-md bg-indigo-50 px-4 py-2 font-medium text-indigo-900 hover:bg-indigo-100">
								Cancelar
							</AlertDialog.Close>
							<AlertDialog.Close
								className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
								onClick={() => {
									if (alertType === "falta") {
										handleDeleteFalta(deleteId);
									} else {
										handleDeleteAtestado(deleteId);
									}
								}}
							>
								Excluir
							</AlertDialog.Close>
						</div>
					</AlertDialog.Popup>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	);
};

export default FuncionarioDetalhes;
