import { useRouter } from "next/router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function index() {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if(!user) router.push('/login')
  }, [user])

	return (
		<div>
			<h1 className="text-3xl">Home</h1>
			<button
				onClick={() => signOut(auth)}
				className="border border-black"
			>
				Sign Out
			</button>
		</div>
	);
}
