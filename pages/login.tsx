import Head from "next/head";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { SiFirebase, SiReact, SiGooglekeep } from "react-icons/si";

export default function Login() {
	const [user] = useAuthState(auth);
    const router = useRouter()

	const provider = new GoogleAuthProvider();
	const singInWithGoogle = async () => {
		await signInWithPopup(auth, provider)
	};

    if(user) {
        router.push('/')
    }

	return (
		<div className="h-screen grid place-items-center">
			<Head>
				<title>Keep - Login</title>
			</Head>
			<div className="flex flex-col items-center gap-y-[50px]">
				<div className="flex items-center gap-x-5 text-5xl">
					<SiFirebase className="text-yellow-400" />
					<span>+</span>
					<SiReact className="text-sky-400" />
					<span>=</span>
					<SiGooglekeep className="text-yellow-500" />
				</div>
				<h1 className="text-3xl">Login to access your notes</h1>
				<button
					onClick={singInWithGoogle}
					className="flex items-center border-[1.5px] border-yellow-500 p-2 rounded-md hover:bg-yellow-50"
				>
					<FcGoogle className="mr-2 text-xl" /> Login with Google
				</button>
			</div>
		</div>
	);
}
