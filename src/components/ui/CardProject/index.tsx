"use client";

import { IProject } from "@/src/app/api/projects/types";
import { calculateProgress } from "@/src/utils/calculateProgress";
import Progress from "@/src/components/ui/Progress";

export const defineColorStatus = (
	status: "active" | "delayed" | "completed"
) => {
	switch (status) {
		case "active":
			return "green-500";
		case "completed":
			return "blue-500";
		case "delayed":
			return "red-500";
		default:
			return "#000";
	}
};

export const defineLabelStatus = (
	status: "active" | "delayed" | "completed"
) => {
	switch (status) {
		case "active":
			return "Ativo";
		case "completed":
			return "Concluído";
		case "delayed":
			return "Atrasado";
		default:
			return status;
	}
};

const CardProject = ({
	project,
	hideBarProgress = false,
}: {
	project: IProject;
	hideBarProgress?: boolean;
}) => {
	const progress = calculateProgress(project);

	return (
		<div className="border rounded p-4 flex items-center justify-between">
			<div>
				<h3 className="text-lg font-medium">{project.name}</h3>
				<p className="text-sm text-gray-600">{project.description}</p>
				<p className={`text-sm mt-1 text-${defineColorStatus(project.status)}`}>
					Status: {defineLabelStatus(project.status)}
				</p>

				<div className="mt-2">
					<div className="text-sm text-gray-500 mb-1">
						Progresso: {progress}%
					</div>
					{!hideBarProgress && (
						<Progress value={progress} className="w-full h-2.5" />
					)}
				</div>
			</div>
			<a href={`/projects/${project.id}`} className="text-blue-500 underline">
				Ver Detalhes
			</a>
		</div>
	);
};

export default CardProject;