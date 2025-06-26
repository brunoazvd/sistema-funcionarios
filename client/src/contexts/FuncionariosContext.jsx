import { createContext, useContext, useEffect, useState } from "react";
import { buscarTodosFuncionarios } from "../services/api/funcionarios.js";

const FuncionariosContext = createContext();

export const useFuncionarios = () => {
	const context = useContext(FuncionariosContext);
	if (!context) {
		throw new Error(
			"useFuncionarios must be used within a FuncionariosProvider"
		);
	}
	return context;
};

export const FuncionariosProvider = ({ children }) => {
	const [funcionarios, setFuncionarios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchFuncionarios = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await buscarTodosFuncionarios();
			setFuncionarios(data);
		} catch (err) {
			setError(err.message);
			console.error("Erro ao carregar funcionários:", err);
		} finally {
			setLoading(false);
		}
	};

	const refreshFuncionarios = () => {
		fetchFuncionarios();
	};

	const addFuncionario = (newFuncionario) => {
		setFuncionarios((prev) => [...prev, newFuncionario]);
	};

	const updateFuncionario = (id, updatedFuncionario) => {
		setFuncionarios((prev) =>
			prev.map((funcionario) =>
				funcionario.id === id
					? { ...funcionario, ...updatedFuncionario }
					: funcionario
			)
		);
	};

	const removeFuncionario = (id) => {
		setFuncionarios((prev) =>
			prev.filter((funcionario) => funcionario.id !== id)
		);
	};

	const getFuncionarioById = (id) => {
		return funcionarios.find(
			(funcionario) => funcionario.id === parseInt(id)
		);
	};

	useEffect(() => {
		fetchFuncionarios();
	}, []);

	const value = {
		funcionarios,
		loading,
		error,
		refreshFuncionarios,
		addFuncionario,
		updateFuncionario,
		removeFuncionario,
		getFuncionarioById,
	};

	return (
		<FuncionariosContext.Provider value={value}>
			{children}
		</FuncionariosContext.Provider>
	);
};
