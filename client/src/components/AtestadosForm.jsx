import { Input } from "@base-ui-components/react/input";
import { Select } from "@base-ui-components/react/select";

import { useState } from "react";

const AtestadosForm = () => {
	const [formData, setFormData] = useState({
		funcionario: "",
		data: "",
		dias: "0",
		tipo: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// TODO: Enviar formulário para o servidor
	};

	console.log(formData);

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
				Cadastrar Novo Atestado
			</p>
			<div className="flex flex-col gap-3 mb-3">
				<div>
					<p className="font-medium mb-1">Funcionário:</p>
					<Input
						name="funcionario"
						className="bg-indigo-50 w-full px-2 py-1"
						type="text"
						value={formData.funcionario}
						onChange={handleChange}
					/>
				</div>
				<div>
					<p className="font-medium mb-1">Data:</p>
					<Input
						name="data"
						className="bg-indigo-50 w-full px-2 py-1"
						type="date"
						value={formData.data}
						onChange={handleChange}
					/>
				</div>
				{/* <div>
					<p className="font-medium">Tipo:</p>
					<Input
						name="tipo"
						className="bg-indigo-50 w-full px-2 py-1"
						type="text"
						value={formData.tipo}
						onChange={handleChange}
					/>
				</div> */}
				<div>
					<p className="font-medium mb-1">Tipo:</p>
					<select
						className="bg-indigo-50 w-full py-1 px-2"
						name="tipo"
						onChange={handleChange}
						value={formData.tipo}
					>
						<option value="" disabled>
							Tipo do Atestado
						</option>
						<option value="COMPARECIMENTO">
							Atestado de Comparecimento
						</option>
						<option value="ATESTADO_MEDICO">Atestado Médico</option>
					</select>
				</div>
				{formData.tipo == "ATESTADO_MEDICO" && (
					<div>
						<p className="font-medium mb-1">Dias:</p>
						<Input
							name="dias"
							className="bg-indigo-50 w-full px-2 py-1"
							type="number"
							value={formData.dias}
							onChange={handleChange}
						/>
					</div>
				)}
			</div>
			<button
				type="submit"
				className="bg-indigo-300 hover:bg-indigo-400 py-2 w-full"
			>
				Cadastrar
			</button>
		</form>
	);
};

export default AtestadosForm;
