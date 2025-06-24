import { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

const CustomDatePicker = ({ value, handleChange }) => {
	return (
		<DatePicker
			selected={value}
			onChange={handleChange}
			locale="pt-BR"
			dateFormat="dd/MM/yyyy"
			showIcon
			className="bg-indigo-50 text-black w-30 h-8"
		/>
	);
};

export default CustomDatePicker;
