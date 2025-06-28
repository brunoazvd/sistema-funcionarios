import { tipoContrato } from "../../general/Enums";

const TipoContratoSelect = ({ value, handleChange, name }) => {
	return (
		<select
			className="bg-indigo-50 w-full min-w-48 text-black  py-1 px-2"
			name={name}
			value={value}
			onChange={handleChange}
		>
			<option disabled value="" className="text-gray-500">
				Selecione
			</option>
			{tipoContrato.map((tipo, index) => {
				return (
					<option key={index} value={tipo[0]}>
						{tipo[1]}
					</option>
				);
			})}
		</select>
	);
};

export default TipoContratoSelect;
