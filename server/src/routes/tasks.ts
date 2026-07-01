import { Router, Request, Response, NextFunction } from "express";
import { Task } from "../models/Task";
import { ActivityLog } from "../models/ActivityLog";
import { isValidObjectId } from "mongoose";

const router = Router();

const cycleStatus = (current: string) => {
	if (current === "To Do") return "In Progress";
	if (current === "In Progress") return "Done";
	return "To Do";
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 });

		if (!tasks || tasks.length === 0) {
			return res.status(404).json({ message: "No tasks found" });
		}

		res.status(200).json({
			data: tasks,
			count: tasks.length,
			message: "Tasks fetched successfully",
		});
	} catch (error: any) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "Something went wrong in the database operation!";
		}
		next(error);
	}
});

router.patch(
	"/:id/toggle",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!isValidObjectId(req.params.id)) {
			return res.status(400).json({ error: "Invalid task ID format" });
		}

		try {
			const task = await Task.findById(req.params.id);
			if (!task) {
				return res.status(404).json({ error: "Task not found" });
			}

			task.status = cycleStatus(task.status);
			await task.save();

			const log = await ActivityLog.create({
				activity: `Task '${task.title}' shifted to ${task.status}`,
				taskId: task._id,
			});

			res.status(200).json({
				data: { task, log },
				message: `Task status updated to ${task.status} successfully`,
			});
		} catch (error: any) {
			if (!error.statusCode) {
				error.statusCode = 500;
				error.message = "Something went wrong in the database operation!";
			}
			next(error);
		}
	},
);

export default router;
