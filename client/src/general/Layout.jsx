import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback.jsx";

export const Layout = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			{children}
		</ErrorBoundary>
	);
};
