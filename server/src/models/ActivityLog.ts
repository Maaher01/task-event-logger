import { Schema, model, Document, Types } from "mongoose";

export interface ActivityLogDocument extends Document {
	activity: string;
	taskId: Types.ObjectId;
	timestamp: Date;
}

const activityLogSchema = new Schema<ActivityLogDocument>({
	activity: { type: String, required: true },
	taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
	timestamp: { type: Date, default: Date.now },
});

export const ActivityLog = model<ActivityLogDocument>(
	"ActivityLog",
	activityLogSchema,
);
