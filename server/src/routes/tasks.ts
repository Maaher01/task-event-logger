import { Router } from "express";
import { Task } from "../models/Task";
import { ActivityLog } from "../models/ActivityLog";

const router = Router();

const cycleStatus = (current: string) => {
	if (current === "To Do") return "In Progress";
	if (current === "In Progress") return "Done";
	return "To Do";
};

router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Unable to fetch tasks" });
	}
});

router.patch("/:id/toggle", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}

		task.status = cycleStatus(task.status) as Task["status"];
		await task.save();

		const log = await ActivityLog.create({
			activity: `Task '${task.title}' shifted to ${task.status}`,
			taskId: task._id,
		});

		res.json({ task, log });
	} catch (error) {
		res.status(500).json({ error: "Unable to toggle task status" });
	}
});

export default router;
