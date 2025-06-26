import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./general/Router.jsx";
import { Loading } from "./general/Loading.jsx";
import { FuncionariosProvider } from "./contexts/FuncionariosContext.jsx";

export const App = () => (
	<BrowserRouter>
		<FuncionariosProvider>
			<Suspense fallback={<Loading name="suspense" />}>
				<div className="h-full bg-indigo-950 text-indigo-50">
					<Router />
				</div>
			</Suspense>
		</FuncionariosProvider>
	</BrowserRouter>
);
