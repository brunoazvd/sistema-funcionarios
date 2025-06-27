const AtestadosResults = ({ results, setModalContent }) => {
	return (
		results.length > 0 && (
			<table className="w-full text-left text-black">
				<thead className="bg-indigo-500 text-indigo-50">
					<tr>
						<th className="p-2 w-2/10">Funcionário</th>
						<th className="p-2 w-1/10">Data</th>
						<th className="p-2 w-1/10">Dias</th>
						<th className="p-2 w-1/10">Tipo</th>
						<th className="p-2 w-2/10">Observação</th>
						<th className="p-2 w-1/10">Ações</th>
					</tr>
				</thead>
				<tbody>
					{results.map((atestado, index) => {
						return (
							<tr key={index} className="bg-indigo-50">
								<td className="px-2 py-1">
									{atestado.funcionario.nome}
								</td>
								<td className="px-2 py-1">
									{new Date(atestado.data).toLocaleDateString(
										"pt-BR",
										{ timeZone: "UTC" }
									)}
								</td>
								<td className="px-2 py-1">{atestado.dias}</td>
								<td className="px-2 py-1">
									{atestado.tipo === "COMPARECIMENTO"
										? "Comparecimento"
										: "Atestado Médico"}
								</td>
								<td className="px-2 py-1">
									{atestado.observacao
										? atestado.observacao
										: ""}
								</td>
								<td className="px-2 py-1">
									<button
										className="text-sm px-2 bg-yellow-500 cursor-pointer"
										type="button"
										onClick={() =>
											setModalContent(atestado)
										}
									>
										Editar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		)
	);
};

export default AtestadosResults;
