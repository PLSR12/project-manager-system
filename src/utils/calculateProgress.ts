import { IProject } from "../app/api/projects";
import { ITask } from "../app/api/tasks";

export const calculateProgress = (project: IProject) => {
	const totalTasks = project.tasks?.length || 0;
	const completedTasks =
		project.tasks?.filter((task: ITask) => task.status === "completed")
			.length || 0;
	return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};
