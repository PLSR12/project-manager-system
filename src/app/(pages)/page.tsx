"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
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
import { Bar } from "react-chartjs-2";
import withAuth from "./withAuth";
import CardProject from "@/src/components/ui/CardProject";

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

const Home = () => {
	const { data: session, status } = useSession();
	const { projects } = useDataProvider();
	const activeProjects = useMemo(
		() => projects.filter((p) => p.status === "active").length,
		[projects]
	);
	const completedProjects = useMemo(
		() => projects.filter((p) => p.status === "completed").length,
		[projects]
	);
	const delayedProjects = useMemo(
		() => projects.filter((p) => p.status === "delayed").length,
		[projects]
	);

	const options = {
		responsive: true,
		plugins: {
			position: "top",
			title: {
				display: false,
				text: "Resumo de Projetos",
			},
		},
	};

	const chartData = {
		labels: ["Projetos"],
		datasets: [
			{
				label: "Projetos Completos",
				data: [completedProjects],
				backgroundColor: ["#4caf50"],
			},
			{
				label: "Projetos em Andamento",
				data: [activeProjects],
				backgroundColor: ["#2196f3"],
			},
			{
				label: "Projetos Com Atrasos",
				data: [delayedProjects],
				backgroundColor: ["#f44336"],
			},
		],
	};

	useEffect(() => {
		if (status === "authenticated" && session?.user) {
			localStorage.setItem("user", JSON.stringify(session.user));
		}
	}, [session, status]);

	return (
		<div className="min-w-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
				<h1 className="text-2xl font-bold mb-4 text-center">
					Resumo dos Projetos
				</h1>

				<div className="bg-white shadow-md rounded p-4 mb-6">
					<h3 className="text-xl font-semibold mb-2">Dashboard de Projetos</h3>
					<Bar data={chartData} options={options} />
				</div>

				<div className="bg-white rounded p-4">
					<div className="space-y-4">
						{projects.map((project, index) => {
							return (
								<>
									<CardProject
										key={project.id}
										project={project}
										hideBarProgress={true}
									/>
								</>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuth(Home);
