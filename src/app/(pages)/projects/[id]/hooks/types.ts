import { IProject } from "@/src/app/api/projects/types";
import {
	Control,
	FieldErrors,
	UseFormHandleSubmit,
	UseFormReset,
} from "react-hook-form";

export interface IFormTaskTitleInput {
	taskTitle: string;
}

export interface IFormCommentInput {
	comment: string;
}

export type IUseProjectDetails = {
	project: IProject | null;
	isModalOpen: boolean;
	handleAddTask: (data: { taskTitle: string }) => void;
	handleCompleteTask: (taskId: string) => void;
	handleAddComment: (data: IFormCommentInput) => void;
	handleCompleteProject: () => void;
	onCloseModal: () => void;
	onOpenModal: () => void;
	control: Control<IFormCommentInput>;
	handleSubmit: UseFormHandleSubmit<IFormCommentInput>;
	errors: FieldErrors<IFormCommentInput>;
	isSubmitting: boolean;
	setValue: (name: keyof IFormCommentInput, value: string) => void;
	watchComment: string;
	reset: UseFormReset<IFormCommentInput>;
};
