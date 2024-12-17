import { IProject } from "./types";

export const LOCAL_STORAGE_PROJECTS_KEY = "projects";

export const getProjects = (): IProject[] => {
	if (typeof window === "undefined") return [];
	const data = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
	return data !== null ? JSON.parse(data) : [];
};

export const saveProjects = (projects: IProject[]): void => {
	localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
};

export const addProject = (project: IProject): void => {
	const projects = getProjects();
	projects.push(project);
	saveProjects(projects);
};

export const updateProject = (
	id: string,
	updatedProject: Partial<IProject>
): void => {
	const projects = getProjects();
	const index = projects.findIndex((project) => project.id === id);
	if (index !== -1) {
		projects[index] = { ...projects[index], ...updatedProject };
		saveProjects(projects);
	}
};

export const deleteProject = (id: string): void => {
	const projects = getProjects().filter((project) => project.id !== id);
	saveProjects(projects);
};
