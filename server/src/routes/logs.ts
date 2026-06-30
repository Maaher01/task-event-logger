import { Router } from "express";
import { ActivityLog } from "../models/ActivityLog";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const logs = await ActivityLog.find().sort({ timestamp: -1 });
		res.json(logs);
	} catch (error) {
		res.status(500).json({ error: "Unable to fetch logs" });
	}
});

export default router;
