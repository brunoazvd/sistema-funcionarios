import { createContext, useContext, useState, useCallback } from "react";
import LoadingOverlay from "../general/LoadingOverlay.jsx";

// Contexto para gerenciar o estado do loading
const LoadingContext = createContext({
	isLoading: false,
	startLoading: () => {},
	stopLoading: () => {},
});

// Hook personalizado para usar o loading
export const useLoading = () => useContext(LoadingContext);

// Componente de Provider que gerencia o estado
export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	// Inicia o loading com timeout opcional
	const startLoading = useCallback(
		(duration = null) => {
			setIsLoading(true);

			// Se um timeout anterior existir, limpe-o
			if (timeoutId) {
				clearTimeout(timeoutId);
				setTimeoutId(null);
			}

			// Se uma duração for especificada, configure um timeout
			if (duration && duration > 0) {
				const id = setTimeout(() => {
					setIsLoading(false);
					setTimeoutId(null);
				}, duration);
				setTimeoutId(id);
			}
		},
		[timeoutId]
	);

	// Para o loading manualmente
	const stopLoading = useCallback(() => {
		setIsLoading(false);

		// Limpa qualquer timeout pendente
		if (timeoutId) {
			clearTimeout(timeoutId);
			setTimeoutId(null);
		}
	}, [timeoutId]);

	return (
		<LoadingContext.Provider
			value={{ isLoading, startLoading, stopLoading }}
		>
			{children}
			{isLoading && <LoadingOverlay />}
		</LoadingContext.Provider>
	);
};
