import { useState } from "react";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";

const FaltasDetalhesResults = ({
	results,
	deleteAction,
	setModalContent = () => null,
}) => {
	const [deleteId, setDeleteId] = useState(null);

	return results.length > 0 ? (
		<>
			<AlertDialog.Root>
				<table className="text-black table-auto text-left w-full">
					<thead className="bg-indigo-500 text-indigo-50">
						<tr>
							<th className="p-2 w-2/12">Data</th>
							<th className="p-2 w-6/12">Observação</th>
							<th className="p-2 w-2/12">Ações</th>
						</tr>
					</thead>
					<tbody>
						{results.map((falta, index) => (
							<tr key={index} className="bg-indigo-50">
								<td className="px-2 py-1">
									{new Date(falta.data).toLocaleDateString(
										"pt-BR",
										{
											timeZone: "UTC",
										}
									)}
								</td>
								<td className="px-2 py-1">
									{falta.observacao ? falta.observacao : ""}
								</td>
								<td className="px-2 py-1">
									{setModalContent && (
										<button
											className="mr-4 cursor-pointer hover:text-green-600"
											type="button"
											onClick={() =>
												setModalContent(falta)
											}
										>
											<div className="flex">
												<EditIcon />
												<span className="text-xs">
													Editar
												</span>
											</div>
										</button>
									)}
									{deleteAction && (
										<AlertDialog.Trigger
											className="cursor-pointer hover:text-red-600"
											onClick={() =>
												setDeleteId(falta.id)
											}
										>
											<div className="flex">
												<DeleteIcon />
												<span className="text-xs">
													Excluir
												</span>
											</div>
										</AlertDialog.Trigger>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<AlertDialog.Portal>
					<AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
					<AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-sm max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
						<AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
							Excluir Falta?
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
								onClick={() => deleteAction(deleteId)}
							>
								Excluir
							</AlertDialog.Close>
						</div>
					</AlertDialog.Popup>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	) : (
		<p className="text-center py-4 text-gray-600">
			Nenhuma falta registrada
		</p>
	);
};

export default FaltasDetalhesResults;
