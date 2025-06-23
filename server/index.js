import express from "express";
import cors from "cors";

import apiRouter from "./src/api/router/index.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(apiRouter);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running");
});