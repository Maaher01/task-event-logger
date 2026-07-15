# AI Collaboration

This project was built with assistance from **Codex** (VS Code Extension)
as AI coding agent to accelerate development, generate boilerplate, and debug issues.

---

## Prompts Used

### 1. Spinning Up Boilerplate Files

**Prompt:**

> Scaffold a Node.js Express TypeScript project structure for a MERN app called
> "task-event-logger". Generate the folder structure with src/index.ts as the entry point,
> a config/ folder for database connection, a routes/ folder for task and log routes,
> and a models/ folder. Include package.json with express, mongoose, cors, dotenv,
> typescript, and nodemon as dependencies, and a tsconfig.json configured for Node.js.

**Result:** Generated the initial project structure, package.json, and tsconfig.json instantly,
saving manual setup time.

---

### 2. Generating Database Configuration

**Prompt:**

> Generate a Mongoose schema for a Task model in TypeScript with fields: title (string,
> required), description (string, optional), and status (enum: "To Do" | "In Progress" |
> "Done", default "To Do"). Add a separate ActivityLog schema with fields: activity (string,
> required) and taskId (ObjectId ref to Task). Apply versionKey: false and timestamps: true
> to both schemas.

**Result:** Generated typed Mongoose schemas with proper TypeScript interfaces, which were
reviewed and adjusted to export named interfaces for use across the project.

---

### 3. Knocking Out the Tailwind CSS Layout

**Prompt:**

> Create a responsive two-column layout in React using Tailwind CSS. Left column shows a
> TaskList component, right column shows an ActivityFeed component. On mobile, stack them
> vertically. Each task should render as a card with rounded corners, a subtle shadow, a
> colored status badge (gray for "To Do", yellow for "In Progress", green for "Done"),
> and a Toggle Status button.

**Result:** Generated the App.tsx layout and TaskCard component with Tailwind styling,
which was refined to add error state UI and empty state handling.

## Notes

- All AI-generated code was reviewed, tested, and manually adjusted to align with
  project conventions (centralized error handling, consistent { data, count, message }
  response shapes, TypeScript types).
- AI agents were used to accelerate boilerplate and layout generation, not as a
  replacement for understanding the underlying code.
