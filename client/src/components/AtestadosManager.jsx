import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import AtestadosForm from "./AtestadosForm";

import { useState } from "react";

const initialState = {
	minDate: "",
	maxDate: "",
	funcionario: "",
};

const AtestadosManager = () => {
	const [formData, setFormData] = useState(initialState);
	const [results, setResults] = useState([]);

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

	return (
		<>
			<div className="flex flex-row border-b-3 border-indigo-900 pb-6 pt-4 mb-9">
				<form
					className="flex flex-row gap-3 w-min px-6"
					onSubmit={handleSubmit}
				>
					<div>
						<p className="mb-1">Funcionário:</p>
						<Input
							className="bg-indigo-50 text-black px-2 py-1"
							type="text"
							value={formData.funcionario}
							name="funcionario"
							onChange={handleChange}
						/>
					</div>
					<div>
						<p className="mb-1">Data Inicial:</p>
						<Input
							name="minDate"
							className="bg-indigo-50 w-full px-2 py-1 text-black"
							type="date"
							value={formData.minDate}
							onChange={handleChange}
						/>
					</div>
					<div>
						<p className="mb-1">Data Final:</p>
						<Input
							name="maxDate"
							className="bg-indigo-50 w-full px-2 py-1 text-black"
							type="date"
							value={formData.maxDate}
							onChange={handleChange}
						/>
					</div>
					<button
						className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8 mt-auto"
						type="submit"
					>
						Pesquisar
					</button>
				</form>
				<div className="flex flex-row gap-3 w-full px-6">
					<Dialog.Root>
						<Dialog.Trigger
							className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8 mt-auto ml-auto"
							type="button"
						>
							Cadastrar Atestado
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-50" />
							<Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 min-w-md max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-indigo-100 p-6 text-black outline outline-indigo-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
								<AtestadosForm />
							</Dialog.Popup>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</div>
			{/* Aqui estarão os resultados */}
		</>
	);
};

export default AtestadosManager;
