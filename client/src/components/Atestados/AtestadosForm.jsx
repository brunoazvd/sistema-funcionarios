import { Input } from "@base-ui-components/react/input";
import { Toast } from "@base-ui-components/react/toast";
import { useState, useEffect } from "react";

import {
	cadastrarAtestado,
	atualizarAtestado,
} from "../../services/api/atestados.js";
import FuncionarioSelect from "../FuncionarioSelect.jsx";

const initialState = {
	funcionarioId: "",
	data: "",
	dias: "0",
	tipo: "",
	observacao: "",
};

function formatISOToDateOnly(isoString) {
	const date = new Date(isoString);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const AtestadosForm = ({
	closeModal,
	currentAtestado,
	clearAtestado,
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

		if (currentAtestado === null) {
			const atestado = await cadastrarAtestado({
				funcionarioId: Number(formData.funcionarioId),
				data: new Date(formData.data),
				dias: Number(formData.dias),
				tipo: formData.tipo,
				observacao: formData.observacao || null,
			});
			toastManager.add({
				title: "Atestado cadastrado com sucesso!",
				duration: 3000,
			});
			clearResults();
		} else {
			const atestado = await atualizarAtestado(currentAtestado.id, {
				funcionarioId: Number(formData.funcionarioId),
				data: new Date(formData.data),
				dias: Number(formData.dias),
				tipo: formData.tipo,
				observacao: formData.observacao || null,
			});
			clearAtestado();
			updateAction(atestado);
			toastManager.add({
				title: "Atestado atualizado com sucesso!",
				duration: 3000,
			});
		}
		closeModal();
	};

	useEffect(() => {
		if (currentAtestado !== null) {
			setFormData({
				funcionarioId: currentAtestado.funcionarioId,
				data: formatISOToDateOnly(currentAtestado.data),
				dias: currentAtestado.dias,
				tipo: currentAtestado.tipo,
				observacao: currentAtestado.observacao
					? currentAtestado.observacao
					: "",
			});
		} else {
			setFormData(initialState);
		}
	}, [currentAtestado]);

	return (
		<>
			<form className="w-full" onSubmit={handleSubmit}>
				<p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
					{currentAtestado ? "Editar Atestado" : "Cadastrar Atestado"}
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
						<p className="font-medium mb-1">Tipo:</p>
						<select
							required
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
							<option value="ATESTADO_MEDICO">
								Atestado Médico
							</option>
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
					{currentAtestado ? "Editar" : "Cadastrar"}
				</button>
			</form>
		</>
	);
};

export default AtestadosForm;
