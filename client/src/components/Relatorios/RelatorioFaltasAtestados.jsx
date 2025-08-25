import React, { useState } from "react";
import { Input } from "@base-ui-components/react/input";
import { gerarRelatorioFaltasAtestados } from "../../services/api/relatorios";
import { useLoading } from "../../contexts/LoadingContext.jsx";

const initialState = {
	dataInicial: "",
	dataFinal: "",
};

const RelatorioFaltasAtestados = () => {
	const [formData, setFormData] = useState(initialState);
	const { startLoading, stopLoading } = useLoading();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		startLoading(30000);
		try {
			await gerarRelatorioFaltasAtestados(formData);
		} catch (error) {
			console.error(error);
		}
		stopLoading();
	};

	return (
		<div className="flex flex-col gap-4 mx-auto w-fit">
			<h2 className="text-2xl font-bold">
				Relatório de Faltas e Atestados (Relatório Mensal)
			</h2>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col md:flex-row gap-8"
			>
				<div>
					<p className="mb-1">Data Inicial:</p>
					<Input
						name="dataInicial"
						className="bg-indigo-50 w-full px-2 py-1 text-black"
						type="date"
						value={formData.dataInicial}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<p className="mb-1">Data Final:</p>
					<Input
						name="dataFinal"
						className="bg-indigo-50 w-full px-2 py-1 text-black"
						type="date"
						value={formData.dataFinal}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 h-fit md:mt-auto"
					type="submit"
				>
					Gerar Relatório PDF
				</button>
			</form>
		</div>
	);
};

export default RelatorioFaltasAtestados;
