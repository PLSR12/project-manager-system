"use client";
import NAVIGATION_CONSTANTS from "@/src/constants/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { data: session } = useSession();
	const user = useMemo(() => session?.user, [session]);
	const router = useRouter();

	const toggleDropdown = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		signOut();
		router.push(NAVIGATION_CONSTANTS.LOGIN);
	};

	return (
		<header className="bg-blue-500 text-white p-4 flex justify-between items-center">
			<div className="flex space-x-4">
				<Link
					className="px-4 py-2 rounded hover:bg-blue-700"
					href={NAVIGATION_CONSTANTS.HOME_APP}
				>
					Home
				</Link>
				<Link
					className="px-4 py-2 rounded hover:bg-blue-700"
					href={NAVIGATION_CONSTANTS.PROJECTS_HOME}
				>
					Projetos
				</Link>
			</div>

			<div className="flex items-center space-x-4 relative">
				<div
					className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
					onClick={toggleDropdown}
				>
					{user?.image !== null && (
						<img
							src={user?.image}
							alt="Avatar"
							className="w-full h-full object-cover"
						/>
					)}
				</div>

				{showDropdown && (
					<div className="absolute right-0 mt-20 w-40 bg-white text-black rounded shadow-lg">
						<div
							className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
							onClick={handleLogout}
						>
							Sair
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
