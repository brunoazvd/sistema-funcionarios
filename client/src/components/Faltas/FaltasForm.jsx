import { Input } from "@base-ui-components/react/input";
import { Toast } from "@base-ui-components/react/toast";
import { useState, useEffect } from "react";

import { cadastrarFalta, atualizarFalta } from "../../services/api/faltas.js";

import FuncionarioSelect from "../FuncionarioSelect.jsx";
import FuncionarioAutocomplete from "../FuncionarioAutocomplete.jsx";

const initialState = {
	funcionarioId: "",
	data: "",
	observacao: "",
};

function formatISOToDateOnly(isoString) {
	const date = new Date(isoString);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const FaltasForm = ({
	closeModal,
	currentFalta,
	clearFalta,
	updateAction,
	clearResults,
}) => {
	const [formData, setFormData] = useState(initialState);
	const toastManager = Toast.useToastManager();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (currentFalta === null) {
			const falta = await cadastrarFalta({
				funcionarioId: Number(formData.funcionarioId),
				data: new Date(formData.data),
				observacao: formData.observacao || null,
			});
			toastManager.add({
				title: "Falta cadastrada com sucesso!",
				duration: 3000,
			});
			clearResults();
		} else {
			const falta = await atualizarFalta(currentFalta.id, {
				funcionarioId: Number(formData.funcionarioId),
				data: new Date(formData.data),
				observacao: formData.observacao || null,
			});
			clearFalta();
			updateAction(falta);
			toastManager.add({
				title: "Falta atualizada com sucesso!",
				duration: 3000,
			});
		}
		closeModal();
	};

	useEffect(() => {
		if (currentFalta !== null) {
			setFormData({
				funcionarioId: currentFalta.funcionarioId,
				data: formatISOToDateOnly(currentFalta.data),
				dias: currentFalta.dias,
				tipo: currentFalta.tipo,
				observacao: currentFalta.observacao
					? currentFalta.observacao
					: "",
			});
		} else {
			setFormData(initialState);
		}
	}, [currentFalta]);

	return (
		<>
			<form className="w-full" onSubmit={handleSubmit}>
				<p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
					{currentFalta ? "Editar Falta" : "Cadastrar Falta"}
				</p>
				<div className="flex flex-col gap-3 mb-6">
					<div>
						<p className="font-medium mb-1">Funcionário:</p>
						<FuncionarioAutocomplete
							name="funcionarioId"
							value={formData.funcionarioId}
							onChange={handleChange}
							required
							placeholder="Pesquise um funcionário"
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
						<p className="font-medium mb-1">Observação:</p>
						<Input
							name="observacao"
							className="bg-indigo-50 w-full px-2 py-1"
							type="text"
							value={formData.observacao}
							onChange={handleChange}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-indigo-300 hover:bg-indigo-400 py-2 w-full"
				>
					{currentFalta ? "Editar" : "Cadastrar"}
				</button>
			</form>
		</>
	);
};

export default FaltasForm;
