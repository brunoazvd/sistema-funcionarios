import express from "express";
import cors from "cors";

import apiRoutes from "./src/api/routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(apiRoutes);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running");
});