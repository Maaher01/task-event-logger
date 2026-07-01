import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { corsOptions } from "./config/corsOptions";
import databaseConnection from "./config/dbConnection";
import middleware from "./middleware/errorHandler";

import taskRoutes from "./routes/tasks";
import logRoutes from "./routes/logs";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

/**
 * MAIN BASE GET PATH
 */
app.get("/", (req, res) => {
	res.send(
		`<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center">
			<h1 style="color: blueviolet">API RUNNING...</h1>
		</div>`,
	);
});

app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(port, async () => {
	await databaseConnection();
	console.log(`Server running on http://localhost:${port}`);
});
