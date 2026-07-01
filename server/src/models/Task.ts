import { Schema, model, Document } from "mongoose";

export interface TaskDocument extends Document {
	title: string;
	description?: string;
	status: "To Do" | "In Progress" | "Done";
	createdAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["To Do", "In Progress", "Done"],
			default: "To Do",
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export const Task = model<TaskDocument>("Task", taskSchema);
