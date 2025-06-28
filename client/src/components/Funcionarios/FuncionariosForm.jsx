import { Input } from "@base-ui-components/react/input";
import { Toast } from "@base-ui-components/react/toast";
import { useState, useEffect } from "react";

import CargoSelect from "../selects/CargoSelect.jsx";
import SexoSelect from "../selects/SexoSelect.jsx";
import TipoContratoSelect from "../selects/TipoContratoSelect.jsx";

import { cadastrarFalta, atualizarFalta } from "../../services/api/faltas.js";

import { formatISOToDateOnly } from "../../helpers/date.js";

const initialState = {
	nome: "",
	cargo: "",
	sexo: "",
	cpf: "",
	dataNascimento: "",
	dataAdmissao: "",
	email: "",
	telefone: "",
	tipoContrato: "",
};

const FuncionariosForm = ({
	closeModal,
	currentFuncionario,
	clearFuncionario,
	updateAction,
	clearResults,
}) => {
	const [formData, setFormData] = useState(initialState);
	const toastManager = Toast.useToastManager();

	console.log(formData);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("submitted"); // to be implemented
	};

	useEffect(() => {
		if (currentFuncionario !== null) {
			setFormData({
				nome: currentFuncionario.nome,
				cargo: currentFuncionario.cargo,
				sexo: currentFuncionario.sexo,
				cpf: currentFuncionario.cpf,
				dataNascimento: formatISOToDateOnly(
					currentFuncionario.dataNascimento
				),
				dataAdmissao: formatISOToDateOnly(
					currentFuncionario.dataAdmissao
				),
				email: currentFuncionario.email,
				telefone: currentFuncionario.telefone,
				tipoContrato: currentFuncionario.tipoContrato,
			});
		} else {
			setFormData(initialState);
		}
	}, [currentFuncionario]);

	return (
		<>
			<form className="w-full" onSubmit={handleSubmit}>
				<p className="text-center text-xl -mt-1.5 mb-3 font-bold tracking-wide">
					{currentFuncionario
						? "Editar Funcionário"
						: "Cadastrar Funcionário"}
				</p>
				<div className="flex flex-col gap-3 mb-6">
					<div>
						<p className="font-medium mb-1">Nome:</p>
						<Input
							name="nome"
							className="bg-indigo-50 w-full px-2 py-1"
							type="text"
							value={formData.nome}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="font-medium mb-1">Cargo:</p>
							<CargoSelect
								value={formData.cargo}
								handleChange={handleChange}
								name="cargo"
							/>
						</div>
						<div>
							<p className="font-medium mb-1">Sexo:</p>
							<SexoSelect
								value={formData.sexo}
								handleChange={handleChange}
								name="sexo"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="font-medium mb-1">Telefone:</p>
							<Input
								name="telefone"
								className="bg-indigo-50 w-full px-2 py-1"
								type="text"
								value={formData.telefone}
								onChange={handleChange}
							/>
						</div>
						<div>
							<p className="font-medium mb-1">E-mail:</p>
							<Input
								name="email"
								className="bg-indigo-50 w-full px-2 py-1"
								type="text"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="font-medium mb-1">
								Data de Nascimento:
							</p>
							<Input
								name="dataNascimento"
								className="bg-indigo-50 w-full px-2 py-1"
								type="date"
								value={formData.data}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<p className="font-medium mb-1">
								Data de Admissão:
							</p>
							<Input
								name="dataAdmissao"
								className="bg-indigo-50 w-full px-2 py-1"
								type="date"
								value={formData.data}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="font-medium mb-1">CPF:</p>
							<Input
								name="cpf"
								className="bg-indigo-50 w-full px-2 py-1"
								type="text"
								value={formData.cpf}
								onChange={handleChange}
							/>
						</div>
						<div>
							<p className="font-medium mb-1">
								Tipo de Contrato:
							</p>
							<TipoContratoSelect
								value={formData.tipoContrato}
								handleChange={handleChange}
								name="tipoContrato"
							/>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="bg-indigo-300 hover:bg-indigo-400 py-2 w-full"
				>
					{currentFuncionario ? "Editar" : "Cadastrar"}
				</button>
			</form>
		</>
	);
};

export default FuncionariosForm;
