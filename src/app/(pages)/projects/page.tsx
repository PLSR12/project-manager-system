"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDataProvider } from "@/src/contexts/DataProvider";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import ModalCreate from "./components/ModalCreate";
import withAuth from "../withAuth";
import CardProject from "@/src/components/ui/CardProject";

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

const Projects = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { projects } = useDataProvider();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			localStorage.setItem("user", JSON.stringify(session.user));
		}
	}, [session, status]);

	return (
		<div className="min-w-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
				<div className="mb-8 flex justify-between items-center">
					<h2 className="text-xl font-semibold mb-4">Listagem de Projetos</h2>
					<div className="mb-6 flex justify-end">
						<Button onClick={openModal} className="bg-green-500 text-white">
							Adicionar Novo Projeto
						</Button>
					</div>
				</div>

				{isModalOpen && <ModalCreate closeModal={closeModal} />}

				<div className="bg-white  rounded p-2">
					<div className="space-y-4">
						{projects.map((project, index) => {
							return (
								<>
									<CardProject key={project.id} project={project} />
								</>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuth(Projects);
