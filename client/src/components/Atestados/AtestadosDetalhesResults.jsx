import { useState } from "react";
import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";

const AtestadosDetalhesResults = ({
	results,
	handleOpenAlert,
	alertType,
	setModalContent = () => null,
}) => {
	return results.length > 0 ? (
		<>
			<table className="text-black table-auto text-left w-full">
				<thead className="bg-indigo-500 text-indigo-50">
					<tr>
						<th className="p-2 w-1/10">Data</th>
						<th className="p-2 w-2/10">Tipo</th>
						<th className="p-2 w-1/10">Dias</th>
						<th className="p-2 w-3/10">Observação</th>
						<th className="p-2 w-2/10">Ações</th>
					</tr>
				</thead>
				<tbody>
					{results.map((atestado, index) => (
						<tr key={index} className="bg-indigo-50">
							<td className="px-2 py-1">
								{new Date(atestado.data).toLocaleDateString(
									"pt-BR",
									{
										timeZone: "UTC",
									}
								)}
							</td>
							<td className="px-2 py-1">
								{atestado.tipo === "COMPARECIMENTO"
									? "Comparecimento"
									: "Atestado Médico"}
							</td>
							<td className="px-2 py-1">
								{atestado.dias === 0 ? "" : atestado.dias}
							</td>
							<td className="px-2 py-1">
								{atestado.observacao ? atestado.observacao : ""}
							</td>
							<td className="px-2 py-1">
								{setModalContent && (
									<button
										className="mr-4 cursor-pointer hover:text-green-600"
										type="button"
										onClick={() =>
											setModalContent(atestado)
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
								<button
									className="cursor-pointer hover:text-red-600"
									onClick={() =>
										handleOpenAlert(
											Number(atestado.id),
											alertType
										)
									}
								>
									<div className="flex">
										<DeleteIcon />
										<span className="text-xs">Excluir</span>
									</div>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	) : (
		<p className="text-center py-4 text-gray-600">
			Nenhum atestado registrado
		</p>
	);
};

export default AtestadosDetalhesResults;
