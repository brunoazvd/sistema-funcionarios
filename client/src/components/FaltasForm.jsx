import { Input } from "@base-ui-components/react/input";

import { useState } from "react";

import { cadastrarFalta } from "../services/api/faltas";
import FuncionarioSelect from "./FuncionarioSelect.jsx";

const FaltasForm = () => {
	const [formData, setFormData] = useState({
		funcionarioId: "",
		data: "",
		observacao: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const falta = await cadastrarFalta({
				funcionarioId: Number(formData.funcionarioId),
				data: new Date(formData.data),
				observacao: formData.observacao || null,
			});
			console.log('Falta cadastrada:', falta);
			// Reset form
			setFormData({
				funcionarioId: "",
				data: "",
				observacao: "",
			});
		} catch (error) {
			console.error('Erro ao cadastrar falta:', error);
		}
	};

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
				Cadastrar Nova Falta
			</p>
			<div className="flex flex-col gap-3 mb-6">
				<div>
					<p className="font-medium mb-1">Funcionário:</p>
					<FuncionarioSelect
						name="funcionarioId"
						value={formData.funcionarioId}
						onChange={handleChange}
						required
						placeholder="Selecione um funcionário"
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
						required
					/>
				</div>
				<div>
					<p className="font-medium mb-1">Observação (opcional):</p>
					<textarea
						name="observacao"
						className="bg-indigo-50 w-full px-2 py-1 resize-none"
						rows="3"
						value={formData.observacao}
						onChange={handleChange}
						placeholder="Observações sobre a falta..."
					/>
				</div>
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

export default FaltasForm;
