import { Input } from "@base-ui-components/react/input";
import { Dialog } from "@base-ui-components/react/dialog";

import CustomDatePicker from "./CustomDatePicker";
import AtestadosForm from "./AtestadosForm";

import { useState } from "react";

const initialState = {
	minDate: null,
	maxDate: null,
	funcionario: "",
};

const AtestadosManager = () => {
	const [formData, setFormData] = useState(initialState);
	const [results, setResults] = useState([]);

	return (
		<>
			<div className="flex flex-row border-b-3 border-indigo-900 pb-6 pt-4 mb-9">
				<div className="flex flex-row gap-3 w-min px-6">
					<div>
						<p>Funcionário:</p>
						<Input
							className="bg-indigo-50 text-black px-2 py-1"
							type="text"
							value={formData.funcionario}
							onChange={(e) =>
								setFormData({
									...formData,
									funcionario: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<p>Data Inicial:</p>
						<CustomDatePicker
							value={formData.minDate}
							handleChange={(newValue) =>
								setFormData({ ...formData, minDate: newValue })
							}
						/>
					</div>
					<div>
						<p>Data Final:</p>
						<CustomDatePicker
							value={formData.maxDate}
							handleChange={(newValue) =>
								setFormData({ ...formData, maxDate: newValue })
							}
						/>
					</div>
					<button className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8 mt-auto">
						Pesquisar
					</button>
				</div>
				<div className="flex flex-row gap-3 w-full px-6">
					<Dialog.Root>
						<Dialog.Trigger
							className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8 mt-auto ml-auto"
							type="button"
						>
							Cadastrar Atestado
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
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
