"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import NAVIGATION_CONSTANTS from "@/src/constants/navigation";
import { useEffect, useState } from "react";

export default function Login() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		if (status === "loading") {
		}

		setIsAuthenticated(status === "authenticated");

		if (status === "authenticated") {
			router.push(NAVIGATION_CONSTANTS.HOME_APP);
		}
	}, [status, router]);

	if (isAuthenticated === null) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-blue-600 py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-white">Carregando...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-blue-600 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-white">
						Faça seu login!
					</h2>
				</div>
				<div>
					<Button
						onClick={() => signIn("google")}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Login com Google
					</Button>
				</div>
			</div>
		</div>
	);
}
