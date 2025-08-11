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

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 'self');
});

//app.get("*", (req, res) => {
//	console.log("request received");
//	res.sendFile(path.join(__dirname, "build", "index.html"));
//})

app.listen(3005, () => {
    console.log("Server is running");
});
