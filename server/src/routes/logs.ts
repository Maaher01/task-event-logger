import { Router, Request, Response, NextFunction } from "express";
import { ActivityLog } from "../models/ActivityLog";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const logs = await ActivityLog.find().sort({ timestamp: -1 });

		if (!logs || logs.length === 0) {
			return res.status(404).json({ message: "No activity logs found" });
		}

		res.status(200).json({
			data: logs,
			count: logs.length,
			message: "Activity logs fetched successfully",
    	});
	} catch (error: any) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "Something went wrong in the database operation!";
		}
		next(error);
	}
});

export default router;
