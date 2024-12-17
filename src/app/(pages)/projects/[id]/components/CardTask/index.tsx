import { ITask } from "@/src/app/api/projects/types";

const CardTask = ({
	task,
	handleCompleteTask,
}: {
	task: ITask;
	handleCompleteTask: (id: string) => void;
}) => {
	return (
		<li
			key={task.id}
			className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
		>
			<span
				className={`${
					task.status === "completed"
						? "line-through text-gray-500"
						: "text-gray-800"
				}`}
			>
				{task.title}
			</span>
			{task.status !== "completed" && (
				<button
					onClick={() => handleCompleteTask(task.id)}
					className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
				>
					Marcar como Concluída
				</button>
			)}
		</li>
	);
};

export default CardTask;
