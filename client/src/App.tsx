import { useCallback, useState } from "react";
import ActivityFeed from "./components/ActivityFeed";
import TaskList from "./components/TaskList";
import type { ActivityLog, Task } from "./types";

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [logs, setLogs] = useState<ActivityLog[]>([]);

	const handleTasksChange = useCallback((nextTasks: Task[]) => {
		setTasks(nextTasks);
	}, []);

	const handleLogsChange = useCallback((nextLogs: ActivityLog[]) => {
		setLogs(nextLogs);
	}, []);

	const handleNewLog = useCallback((log: ActivityLog) => {
		setLogs((currentLogs) => [log, ...currentLogs]);
	}, []);

	return (
		<div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-6">
				<header className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
					<p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
						Task Event Logger
					</p>
					<h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
						Stay on top of work and activity
					</h1>
					<p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
						Review your task pipeline and follow the latest updates in one
						place.
					</p>
				</header>

				<main className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
					<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<h2 className="text-xl font-semibold text-slate-900">Tasks</h2>
								<p className="text-sm text-slate-500">
									Toggle a task to update its status and activity.
								</p>
							</div>
						</div>
						<TaskList
							tasks={tasks}
							onTasksChange={handleTasksChange}
							onNewLog={handleNewLog}
						/>
					</section>

					<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
						<ActivityFeed logs={logs} onLogsChange={handleLogsChange} />
					</section>
				</main>
			</div>
		</div>
	);
}

export default App;
