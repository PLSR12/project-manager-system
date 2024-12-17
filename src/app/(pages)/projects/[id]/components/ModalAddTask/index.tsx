import Input from "@/src/components/ui/Input";
import { Controller, useForm } from "react-hook-form";

interface IFormInputs {
	taskTitle: string;
}

const ModalAddTask = ({
	handleAddTask,
	onCloseModal,
}: {
	handleAddTask: (data: IFormInputs) => void;
	onCloseModal: () => void;
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormInputs>();

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Nova Tarefa
				</h2>
				<form onSubmit={handleSubmit(handleAddTask)}>
					<Controller
						rules={{ required: "Título da Tarefa é obrigatório" }}
						name="taskTitle"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								type={"text"}
								error={errors.taskTitle}
								placeholder="Título da Tarefa"
							/>
						)}
					/>
					<div className="flex justify-between mt-4">
						<button
							type="button"
							onClick={() => onCloseModal()}
							className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
							disabled={isSubmitting}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className={`bg-green-500 text-white px-6 py-2 rounded-lg ${
								isSubmitting
									? "cursor-not-allowed opacity-50"
									: "hover:bg-blue-700"
							}`}
							disabled={isSubmitting}
						>
							{isSubmitting ? "Adicionando..." : "Adicionar Tarefa"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalAddTask;
