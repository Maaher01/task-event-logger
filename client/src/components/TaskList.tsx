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
	const [error, setError] = useState<string | null>(null);
	const [toggleError, setToggleError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/tasks`,
				);

				if (response.status === 404) {
					onTasksChange([]);
					return;
				}

				if (!response.ok) {
					throw new Error("Failed to fetch tasks");
				}

				const { data } = (await response.json()) as { data: Task[] };

				onTasksChange(data);
			} catch (error) {
				setError("Could not load tasks. Please try again later.");
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
				{ method: "PATCH" },
			);

			if (!response.ok) {
				throw new Error("Failed to toggle task");
			}

			const { data } = (await response.json()) as {
				data: { task: Task; log: ActivityLog };
			};

			const nextTasks = tasks.map((item) =>
				item._id === data.task._id ? data.task : item,
			);

			onTasksChange(nextTasks);
			onNewLog(data.log);
		} catch (error) {
			setToggleError("Could not update task status. Please try again.");
			console.error(error);
		}
	};

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-500">
				{error}
			</div>
		);
	}

	if (loading) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
				Loading tasks...
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{toggleError && (
				<div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-500">
					{toggleError}
				</div>
			)}
			{tasks.map((task) => (
				<TaskCard key={task._id} task={task} onToggle={handleToggle} />
			))}
		</div>
	);
}

export default TaskList;
