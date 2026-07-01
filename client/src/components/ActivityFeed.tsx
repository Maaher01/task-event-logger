import { useEffect, useState } from "react";
import type { ActivityLog } from "../types";

interface ActivityFeedProps {
	logs: ActivityLog[];
	onLogsChange: (logs: ActivityLog[]) => void;
}

function ActivityFeed({ logs, onLogsChange }: ActivityFeedProps) {
	const [loading, setLoading] = useState(logs.length === 0);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/logs`,
				);

				if (response.status === 404) {
					onLogsChange([]);
					return;
				}

				if (!response.ok) {
					throw new Error("Failed to fetch logs");
				}

				const { data } = (await response.json()) as { data: ActivityLog[] };

				onLogsChange(data);
			} catch (error) {
				setError("Could not load activity feed. Please try again later.");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (logs.length === 0) {
			void fetchLogs();
		}
	}, [logs.length, onLogsChange]);

	if (loading) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
				Loading activity...
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-500">
				{error}
			</div>
		);
	}

	if (logs.length === 0) {
		return (
			<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
				No activity yet.
			</div>
		);
	}

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<h2 className="mb-4 text-lg font-semibold text-slate-900">
				Activity Feed
			</h2>
			<div className="max-h-[32rem] space-y-3 overflow-y-auto pr-2">
				{logs
					.slice()
					.sort(
						(a, b) =>
							new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
					)
					.map((log) => (
						<div
							key={log._id}
							className="rounded-xl border border-slate-100 bg-slate-50 p-3"
						>
							<p className="text-sm text-slate-700">{log.activity}</p>
							<p className="mt-2 text-xs text-slate-500">
								{new Date(log.timestamp).toLocaleString()}
							</p>
						</div>
					))}
			</div>
		</div>
	);
}

export default ActivityFeed;
