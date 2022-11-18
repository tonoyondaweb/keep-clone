import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { HiOutlineLogout } from "react-icons/hi";

export default function Header() {
	return (
		<header className="h-[60px] border-b-[1.5px] flex justify-between items-center px-5">
			<h1 className="text-3xl">Keep</h1>
			<button onClick={() => signOut(auth)} className="text-3xl">
				<HiOutlineLogout />
			</button>
		</header>
	);
}
