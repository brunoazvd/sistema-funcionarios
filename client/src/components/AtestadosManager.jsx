import CustomDatePicker from "./CustomDatePicker";
import { Input } from "@base-ui-components/react/input";
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
					<button className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8 mt-auto ml-auto">
						Cadastrar Atestado
					</button>
				</div>
			</div>
		</>
	);
};

export default AtestadosManager;
