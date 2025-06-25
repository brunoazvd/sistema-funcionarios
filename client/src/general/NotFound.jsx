import { RoutePaths } from "./RoutePaths.jsx";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center pt-48">
			<h3 className="px-3 py-2 text-5xl font-medium mb-4">
				Página não Encontrada
			</h3>
			<button
				className="bg-indigo-400 hover:bg-indigo-500 px-3 h-8"
				onClick={() => navigate(RoutePaths.HOME)}
				type="button"
			>
				Voltar para Dashboard
			</button>
		</div>
	);
};
