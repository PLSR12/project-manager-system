import Footer from "@/src/components/ui/Footer";
import Header from "@/src/components/ui/Header";
import NAVIGATION_CONSTANTS from "@/src/constants/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
	const WithAuthComponent = (props: any) => {
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
				<div className="min-h-screen flex flex-col mt-4 mb-4">
					<WrappedComponent {...props} />
				</div>
				<Footer />
			</>
		);
	};

	const wrappedComponentName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";
	WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;

	return WithAuthComponent;
};

export default withAuth;
