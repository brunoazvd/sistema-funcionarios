import { cargos } from "../../general/Enums";

const CargoSelect = ({ value, handleChange, name }) => {
	return (
		<select
			className="bg-indigo-50 w-full min-w-48 text-black  py-1 px-2"
			name={name}
			value={value}
			onChange={handleChange}
		>
			<option value="" className="text-gray-500">
				{value !== "" ? "Remover Filtro" : "Selecione um Cargo"}
			</option>
			{cargos.map((cargo, index) => {
				return (
					<option key={index} value={cargo[0]}>
						{cargo[1]}
					</option>
				);
			})}
		</select>
	);
};

export default CargoSelect;
