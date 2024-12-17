import { getProjects, updateProject } from "@/src/app/api/projects";
import { IComment, IProject, ITask } from "@/src/app/api/projects/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	IFormCommentInput,
	IFormTaskTitleInput,
	IUseProjectDetails,
} from "./types";

export const useProjectDetails = (): IUseProjectDetails => {
	const router = useRouter();
	const { id } = useParams();
	const [project, setProject] = useState<IProject | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm<IFormCommentInput>();
	const watchComment = watch("comment", "");

	useEffect(() => {
		const projects = getProjects();
		const currentProject = projects.find((proj) => proj.id === id);
		if (currentProject) {
			setProject(currentProject);
		} else {
			router.push("/projects");
		}
	}, [id, router]);

	const handleAddTask = (data: IFormTaskTitleInput) => {
		if (!data.taskTitle.trim()) return;

		const newTaskData: ITask = {
			id: `t${Date.now()}`,
			title: data.taskTitle,
			status: "active",
		};

		if (project) {
			const updatedProject = {
				...project,
				tasks: [...project.tasks, newTaskData],
			};
			setProject(updatedProject);
			updateProject(project.id, updatedProject);
		}

		setIsModalOpen(false);
	};

	const handleCompleteTask = (taskId: string) => {
		if (project) {
			const updatedProject: IProject = {
				...project,
				tasks: project.tasks.map((task) =>
					task.id === taskId ? { ...task, status: "completed" } : task
				),
			};
			setProject(updatedProject);
			updateProject(project.id, updatedProject);
		}
	};

	const handleAddComment = (data: IFormCommentInput) => {
		if (!data.comment.trim()) return;

		const newCommentData: IComment = {
			id: `c${Date.now()}`,
			author: "Usuário Atual",
			text: data.comment,
			date: new Date().toISOString().split("T")[0],
		};

		if (project) {
			const updatedProject = {
				...project,
				comments: [...project.comments, newCommentData],
			};
			setProject(updatedProject);
			updateProject(project.id, updatedProject);
		}

		reset();
	};

	const handleCompleteProject = () => {
		if (project && project.status !== "completed") {
			const updatedProject: IProject = { ...project, status: "completed" };
			setProject(updatedProject);
			updateProject(project.id, updatedProject);
		}
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const onOpenModal = () => {
		setIsModalOpen(true);
	};

	return {
		project,
		isModalOpen,
		handleAddTask,
		handleCompleteTask,
		handleAddComment,
		handleCompleteProject,
		onCloseModal,
		onOpenModal,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		setValue,
		watchComment,
		reset,
	};
};
