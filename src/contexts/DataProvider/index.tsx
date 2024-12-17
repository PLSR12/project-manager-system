"use client";

import { createContext, useContext, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import {
	getProjects,
	LOCAL_STORAGE_PROJECTS_KEY,
} from "@/src/app/api/projects";
import { projectsMock } from "../../mock/projectsMock";
import { IProject } from "@/src/app/api/projects/types";
export interface IDataProviderContext {
	projects: IProject[];
}

export const DataProviderContext = createContext<IDataProviderContext>(
	{} as IDataProviderContext
);

export const useDataProvider = (): IDataProviderContext =>
	useContext(DataProviderContext);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
	const projects = getProjects();

	useEffect(() => {
		const projects: IProject[] = projectsMock;

		if (!localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) {
			localStorage.setItem(
				LOCAL_STORAGE_PROJECTS_KEY,
				JSON.stringify(projects)
			);
		}
	}, []);

	return (
		<SessionProvider>
			<DataProviderContext.Provider
				value={{
					projects,
				}}
			>
				{children}
			</DataProviderContext.Provider>
		</SessionProvider>
	);
};

export default DataContextProvider;
