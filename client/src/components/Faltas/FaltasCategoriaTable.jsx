import React from "react";

const FaltasCategoriaTable = ({
	funcionarios,
	categoriaCargos,
	currentFaltasState,
	setCurrentFaltasState,
}) => {
	return (
		<div className="flex flex-col gap-3 mb-6 max-h-80 overflow-y-auto">
			<table className="text-black table-auto text-left w-full">
				<thead className="bg-indigo-500 text-indigo-50 sticky top-0">
					<tr>
						<th className="p-2 w-9/12">Funcionário</th>
						<th className="p-2 w-3/12 text-center">Falta</th>
					</tr>
				</thead>
				<tbody>
					{funcionarios
						.filter(
							(funcionario) =>
								categoriaCargos.includes(funcionario.cargo) &&
								funcionario.status === "ATIVO"
						)
						.sort((a, b) => a.nome.localeCompare(b.nome))
						.map((funcionario) => {
							const funcionarioState = currentFaltasState.find(
								(f) => f.funcionarioId === funcionario.id
							);

							return (
								<tr
									key={funcionario.id}
									className="bg-indigo-50"
								>
									<td className="px-2 py-1">
										{funcionario.nome}
									</td>
									<td className="px-2 py-1 text-center">
										<input
											type="checkbox"
											checked={
												funcionarioState?.temFalta ||
												false
											}
											onChange={() => {
												setCurrentFaltasState((prev) =>
													prev.map((f) =>
														f.funcionarioId ===
														funcionario.id
															? {
																	...f,
																	temFalta:
																		!f.temFalta,
																}
															: f
													)
												);
											}}
											className="w-5 h-5"
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default FaltasCategoriaTable;
