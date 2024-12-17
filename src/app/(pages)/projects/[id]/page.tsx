"use client";

import dayjs from "dayjs";
import withAuth from "../../withAuth";
import TextArea from "@/src/components/ui/TextArea";
import ModalAddTask from "./components/ModalAddTask";
import {
	defineColorStatus,
	defineLabelStatus,
} from "@/src/components/ui/CardProject";
import { useProjectDetails } from "./hooks/useProjectDetails";
import { Controller } from "react-hook-form";
import CardTask from "./components/CardTask";
import CardComment from "./components/CardComment";

const ProjectDetails = () => {
	const {
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
	} = useProjectDetails();

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-blue-600 py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-white">Carregando...</div>
			</div>
		);
	}

	return (
		<div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
			<div className="mb-6 flex justify-between items-center">
				<h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
				{project.status !== "completed" && (
					<button
						onClick={handleCompleteProject}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					>
						Finalizar Projeto
					</button>
				)}
			</div>
			<div className="mb-6">
				<p className="text-gray-600 text-lg">{project.description}</p>
				<p className="text-sm text-gray-500 mt-2">
					Responsável: <strong>{project.responsible}</strong>
				</p>
				<p className="text-sm text-gray-500 mt-1">
					Período Estimado: {dayjs(project.startDate).format("DD/MM/YYYY")} até{" "}
					{dayjs(project.endDate).format("DD/MM/YYYY")}
				</p>
				<p
					className={`mt-2 text-sm font-semibold text-${defineColorStatus(
						project.status
					)} 
					`}
				>
					Status: {defineLabelStatus(project.status)}
				</p>
			</div>

			<div className="mb-8 flex justify-between items-center">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Tarefas</h2>
				{project.status !== "completed" && (
					<button
						onClick={() => onOpenModal()}
						className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
					>
						Adicionar Tarefa
					</button>
				)}
			</div>

			<ul className="space-y-4">
				{project.tasks.map((task) => (
					<CardTask
						key={task.id}
						task={task}
						handleCompleteTask={handleCompleteTask}
					/>
				))}
			</ul>

			{isModalOpen && (
				<ModalAddTask
					handleAddTask={handleAddTask}
					onCloseModal={onCloseModal}
				/>
			)}

			<div className="flex flex-col">
				<h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">
					Atividades
				</h3>
				<form onSubmit={handleSubmit(handleAddComment)}>
					<Controller
						rules={{ required: "Comentário é obrigatório" }}
						name="comment"
						control={control}
						render={({ field }) => (
							<TextArea
								{...field}
								value={watchComment}
								error={errors.comment}
								placeholder="Adicione um comentário..."
							/>
						)}
					/>
					{watchComment && (
						<div className="flex gap-4">
							<button
								type="submit"
								className={`bg-blue-600 text-white px-2 py-2 rounded-lg mt-2 ${
									isSubmitting
										? "cursor-not-allowed opacity-50"
										: "hover:bg-blue-700 transition"
								}`}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Adicionando..." : "Adicionar Comentário"}
							</button>

							<button
								type="submit"
								className={`bg-gray-700 text-white px-2 py-2 rounded-lg mt-2`}
								disabled={isSubmitting}
								onClick={() => {
									setValue("comment", "");
									reset();
								}}
							>
								Cancelar{" "}
							</button>
						</div>
					)}
				</form>
			</div>

			<div className="mb-8 mt-4">
				<ul className="space-y-4">
					{project.comments.map((comment) => (
						<CardComment comment={comment} key={comment.id} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default withAuth(ProjectDetails);
