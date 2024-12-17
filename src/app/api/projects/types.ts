export interface IComment {
	id: string;
	text: string;
	date: string;
	author: string;
}

export interface ITask {
	id: string;
	title: string;
	status: "active" | "delayed" | "completed";
}

export interface IProject {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	status: "active" | "delayed" | "completed";
	responsible: string;
	tasks: ITask[];
	comments: IComment[];
}
