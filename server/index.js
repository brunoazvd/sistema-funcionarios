import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./src/api/routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use(apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3005, "0.0.0.0", () => {
    console.log("Server is running");
});