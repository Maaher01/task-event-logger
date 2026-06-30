export interface Task {
	_id: string;
	title: string;
	description: string;
	status: "To Do" | "In Progress" | "Done";
	createdAt: string;
}

export interface ActivityLog {
	_id: string;
	activity: string;
	taskId: string;
	timestamp: string;
}
