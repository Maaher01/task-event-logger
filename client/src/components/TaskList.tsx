import { useEffect, useState } from "react";
import type { ActivityLog, Task } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
	tasks: Task[];
	onTasksChange: (tasks: Task[]) => void;
	onNewLog: (log: ActivityLog) => void;
}

function TaskList({ tasks, onTasksChange, onNewLog }: TaskListProps) {
	const [loading, setLoading] = useState(tasks.length === 0);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/tasks`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch tasks");
				}

				const data = (await response.json()) as Task[];
				onTasksChange(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (tasks.length === 0) {
			void fetchTasks();
		}
	}, [onTasksChange, tasks.length]);

	const handleToggle = async (taskId: string) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}/toggle`,
				{
					method: "PATCH",
				},
			);

			if (!response.ok) {
				throw new Error("Failed to toggle task");
			}

			const { task, log } = (await response.json()) as {
				task: Task;
				log: ActivityLog;
			};
			const nextTasks = tasks.map((item) =>
				item._id === task._id ? task : item,
			);
			onTasksChange(nextTasks);
			onNewLog(log);
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
				Loading tasks...
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{tasks.map((task) => (
				<TaskCard key={task._id} task={task} onToggle={handleToggle} />
			))}
		</div>
	);
}

export default TaskList;
