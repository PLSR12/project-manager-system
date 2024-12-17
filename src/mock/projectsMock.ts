import { IProject } from "../app/api/projects/types";

export const projectsMock: IProject[] = [
	{
		id: "1",
		name: "Projeto A",
		description: "Desenvolvimento de um sistema de gerenciamento de tarefas.",
		startDate: "2024-01-10",
		endDate: "2024-06-30",
		status: "active",
		responsible: "Alice",
		tasks: [
			{
				id: "1-1",
				title: "Criar layout inicial",
				status: "completed",
			},
			{
				id: "1-2",
				title: "Desenvolver a API",
				status: "active",
			},
		],
		comments: [
			{
				id: "c1",
				author: "Bob",
				text: "API parece estar indo bem, mas precisa de testes.",
				date: "2024-03-05",
			},
		],
	},
	{
		id: "2",
		name: "Projeto B",
		description:
			"Criação de uma plataforma de e-commerce para venda de produtos.",
		startDate: "2024-02-15",
		endDate: "2024-12-15",
		status: "active",
		responsible: "Carlos",
		tasks: [
			{
				id: "2-1",
				title: "Desenvolver a página inicial",
				status: "completed",
			},
			{
				id: "2-2",
				title: "Integrar com sistema de pagamento",
				status: "active",
			},
		],
		comments: [
			{
				id: "c2",
				author: "Alice",
				text: "Integração de pagamento ainda está pendente. Precisamos revisar isso.",
				date: "2024-04-10",
			},
		],
	},
	{
		id: "3",
		name: "Projeto C",
		description:
			"Desenvolvimento de uma aplicação mobile para gerenciamento de despesas pessoais.",
		startDate: "2024-03-01",
		endDate: "2024-08-30",
		status: "completed",
		responsible: "Daniele",
		tasks: [
			{
				id: "3-1",
				title: "Criar design do aplicativo",
				status: "completed",
			},
			{
				id: "3-2",
				title: "Desenvolver funcionalidades principais",
				status: "completed",
			},
			{
				id: "3-3",
				title: "Testar usabilidade",
				status: "completed",
			},
		],
		comments: [
			{
				id: "c3",
				author: "Carlos",
				text: "App está funcionando bem. Excelente trabalho.",
				date: "2024-06-20",
			},
		],
	},
	{
		id: "4",
		name: "Projeto D",
		description:
			"Implementação de um sistema de automação de processos internos.",
		startDate: "2024-05-01",
		endDate: "2024-11-30",
		status: "delayed",
		responsible: "Eva",
		tasks: [
			{
				id: "4-1",
				title: "Analisar processos internos",
				status: "completed",
			},
			{
				id: "4-2",
				title: "Desenvolver algoritmo de automação",
				status: "active",
			},
		],
		comments: [
			{
				id: "c4",
				author: "Bob",
				text: "A análise está completa, mas a integração com os sistemas legados será desafiadora.",
				date: "2024-05-15",
			},
		],
	},
];
