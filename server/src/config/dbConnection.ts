import mongoose from "mongoose";

const databaseConnection = async (): Promise<void> => {
	const mongoUri = process.env.MONGO_URI;

	if (!mongoUri) {
		console.error("Missing MONGO_URI environment variable");
		process.exit(1);
	}

	try {
		await mongoose.connect(mongoUri);
		console.info("Connected to MongoDB...");
	} catch (err) {
		console.error("Oops! Could not connect to MongoDB Cluster", err);
		process.exit(1);
	}
};

export default databaseConnection;
