import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useMemo, useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import NAVIGATION_CONSTANTS from "@/src/constants/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
	return (props: any) => {
		const router = useRouter();
		const { data: session, status } = useSession();
		const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
			null
		);

		useEffect(() => {
			if (status === "loading") {
				return;
			}

			setIsAuthenticated(status === "authenticated");

			if (status === "unauthenticated") {
				router.push(NAVIGATION_CONSTANTS.LOGIN);
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
			<>
				<Header />
				<div className="mt-4 mb-4">
					<WrappedComponent {...props} />
				</div>

				<Footer />
			</>
		);
	};
};

export default withAuth;
