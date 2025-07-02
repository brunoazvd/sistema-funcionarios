import { BrowserRouter } from "react-router-dom";
import { Router } from "./general/Router.jsx";
import { FuncionariosProvider } from "./contexts/FuncionariosContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";
import { Toast } from "@base-ui-components/react/toast";

export const App = () => (
	<BrowserRouter>
		<FuncionariosProvider>
			<LoadingProvider>
				<Toast.Provider>
					<div className="min-h-screen bg-indigo-950 text-indigo-50 pb-8">
						<Router />
					</div>
				</Toast.Provider>
			</LoadingProvider>
		</FuncionariosProvider>
	</BrowserRouter>
);
