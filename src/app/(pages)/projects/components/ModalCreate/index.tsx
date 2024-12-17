import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { addProject } from "@/src/app/api/projects";
import Input from "@/src/components/ui/Input/index";
import Select from "@/src/components/ui/Select";
import TextArea from "@/src/components/ui/TextArea";
import { Button } from "@/src/components/ui/Button";

interface IFormInputs {
	name: string;
	startDate: string;
	endDate: string;
	description: string;
	responsible: string;
}

const ModalCreate = ({ closeModal }: { closeModal: () => void }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormInputs>();

	const handleAddProject = (data: IFormInputs) => {
		addProject({
			id: uuidv4(),
			tasks: [],
			comments: [],
			status: "active",
			...data,
		});
		reset();
		closeModal();
		window.location.reload();
	};

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-96">
				<h3 className="text-xl font-semibold mb-4">Novo Projeto</h3>
				<form onSubmit={handleSubmit(handleAddProject)} className="space-y-4">
					<div>
						<Controller
							name="name"
							control={control}
							rules={{ required: "Nome do projeto é obrigatório" }}
							render={({ field }) => (
								<Input
									{...field}
									error={errors.name}
									type="text"
									label="Nome do Projeto"
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="startDate"
							control={control}
							rules={{ required: "Data de início é obrigatória" }}
							render={({ field }) => (
								<Input
									{...field}
									error={errors.startDate}
									type="date"
									label="Data de Início"
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="endDate"
							control={control}
							rules={{ required: "Data de término é obrigatória" }}
							render={({ field }) => (
								<Input
									{...field}
									error={errors.endDate}
									type="date"
									label="Data de Término"
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="description"
							control={control}
							rules={{ required: "Descrição é obrigatória" }}
							render={({ field }) => (
								<TextArea
									{...field}
									label={"Descrição"}
									error={errors.description}
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name="responsible"
							control={control}
							rules={{ required: "Responsável é obrigatório" }}
							render={({ field }) => (
								<Select
									{...field}
									options={[
										{ value: "alice", label: "Alice" },
										{ value: "jose", label: "Jose" },
										{ value: "carlos", label: "Carlos" },
									]}
									label={"Responsável"}
									error={errors.responsible}
								/>
							)}
						/>
					</div>

					<div className="mt-4 flex justify-between">
						<Button onClick={closeModal} className="bg-red-500 text-white">
							Cancelar
						</Button>
						<Button type="submit" className="bg-green-500 text-white">
							Adicionar
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalCreate;
