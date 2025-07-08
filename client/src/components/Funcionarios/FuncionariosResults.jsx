import { useState } from "react";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";

import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";
import DetailsIcon from "../icons/DetailsIcon.jsx";

import { formatTelefone } from "../../helpers/format.js";
import { cargosMap } from "../../general/Enums.jsx";

const FuncionariosResults = ({
	results,
	deleteAction,
	setModalContent,
	handleViewDetails,
}) => {
	const [deleteId, setDeleteId] = useState(null);

	return (
		results.length > 0 && (
			<>
				<AlertDialog.Root>
					<div className="max-h-160 overflow-y-auto">
						<table className="text-black table-auto text-left w-full">
							<thead className="bg-indigo-500 text-indigo-50 sticky top-0">
								<tr>
									<th className="p-2 w-4/12">Nome</th>
									<th className="p-2 w-3/12">Cargo</th>
									<th className="p-2 w-2/12">Telefone</th>
									<th className="p-2 w-3/12">Ações</th>
								</tr>
							</thead>
							<tbody>
								{results.map((funcionario, index) => (
									<tr key={index} className="bg-indigo-50">
										<td className="px-2 py-1">
											{funcionario.nome}
										</td>
										<td className="px-2 py-1">
											{cargosMap.get(funcionario.cargo)}
										</td>
										<td className="px-2 py-1">
											{formatTelefone(
												funcionario.telefone
											)}
										</td>
										<td className="px-2 py-1">
											<button
												className="mr-4 cursor-pointer hover:text-green-600"
												type="button"
												onClick={() =>
													setModalContent(funcionario)
												}
											>
												<div className="flex gap-0.5">
													<EditIcon />
													<span className="text-xs">
														Editar
													</span>
												</div>
											</button>
											<AlertDialog.Trigger
												className="mr-4 cursor-pointer hover:text-red-600"
												onClick={() =>
													setDeleteId(funcionario.id)
												}
											>
												<div className="flex gap-0.5">
													<DeleteIcon />
													<span className="text-xs">
														Excluir
													</span>
												</div>
											</AlertDialog.Trigger>
											<button
												className="mr-4 cursor-pointer hover:text-indigo-600"
												type="button"
												onClick={() =>
													handleViewDetails(
														funcionario
													)
												}
											>
												<div className="flex gap-0.5">
													<DetailsIcon />
													<span className="text-xs">
														Detalhes
													</span>
												</div>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<AlertDialog.Portal>
						<AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50 z-30" />
						<AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-sm max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 z-40">
							<AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
								Excluir Funcionário?
							</AlertDialog.Title>
							<AlertDialog.Description className="mb-6 text-base text-gray-600">
								Você não pode desfazer esta ação!
							</AlertDialog.Description>
							<div className="flex justify-end gap-3">
								<AlertDialog.Close className="flex h-8 items-center justify-center bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-200 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
									Cancelar
								</AlertDialog.Close>
								<AlertDialog.Close
									className="flex h-8 items-center justify-center text-red-800 bg-gray-50 px-3.5 text-base font-medium hover:text-gray-900 hover:bg-red-400 focus-visible:-outline-offset-1 focus-visible:outline-red-800 active:bg-gray-100"
									onClick={() => deleteAction(deleteId)}
								>
									Excluir
								</AlertDialog.Close>
							</div>
						</AlertDialog.Popup>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			</>
		)
	);
};

export default FuncionariosResults;
