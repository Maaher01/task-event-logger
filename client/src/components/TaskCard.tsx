import type { Task } from "../types";

interface TaskCardProps {
	task: Task;
	onToggle: (taskId: string) => void;
}

const statusClasses: Record<Task["status"], string> = {
	"To Do": "bg-slate-100 text-slate-700",
	"In Progress": "bg-amber-100 text-amber-700",
	Done: "bg-emerald-100 text-emerald-700",
};

function TaskCard({ task, onToggle }: TaskCardProps) {
	return (
		<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
			<div className="flex items-start justify-between gap-3">
				<div className="space-y-2">
					<h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
					<p className="text-sm leading-6 text-slate-600">{task.description}</p>
				</div>
				<span
					className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[task.status]}`}
				>
					{task.status}
				</span>
			</div>

			<div className="mt-4 flex items-center justify-between text-sm text-slate-500">
				<span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
				<button
					type="button"
					onClick={() => onToggle(task._id)}
					className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
				>
					Toggle Status
				</button>
			</div>
		</article>
	);
}

export default TaskCard;
