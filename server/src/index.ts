import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks";
import logRoutes from "./routes/logs";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (_req, res) => {
	res.send({ status: "ok" });
});

const start = async () => {
	if (!mongoUri) {
		console.error("Missing MONGO_URI environment variable");
		process.exit(1);
	}

	try {
		await mongoose.connect(mongoUri);
		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
		process.exit(1);
	}
};

start();
