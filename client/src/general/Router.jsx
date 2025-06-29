import { Route, Routes } from "react-router-dom";

import { RoutePaths } from "./RoutePaths.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { NotFound } from "./NotFound.jsx";
import { Layout } from "./Layout.jsx";

export const Router = () => (
	<Routes>
		<Route
			path={RoutePaths.HOME}
			element={
				<Layout>
					<Dashboard />
				</Layout>
			}
		/>
		<Route
			path="*"
			element={
				<Layout>
					<NotFound />
				</Layout>
			}
		/>
	</Routes>
);
