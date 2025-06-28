import { sexos } from "../../general/Enums";

const SexoSelect = ({ value, handleChange, name }) => {
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
			{sexos.map((sexo, index) => {
				return (
					<option key={index} value={sexo[0]}>
						{sexo[1]}
					</option>
				);
			})}
		</select>
	);
};

export default SexoSelect;
