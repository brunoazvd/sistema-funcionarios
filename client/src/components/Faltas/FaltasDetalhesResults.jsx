import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";

const FaltasDetalhesResults = ({
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
										onClick={() => setModalContent(falta)}
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
											Number(falta.id),
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
			Nenhuma falta registrada
		</p>
	);
};

export default FaltasDetalhesResults;
