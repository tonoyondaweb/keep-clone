import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, notesCollectionRef } from "../firebase";
import { HiOutlineLogout } from "react-icons/hi";
import NewNote from "../components/NewNote";
import Note from "../components/Note";

export default function index() {
	const [notes, setNotes] = useState<any>([]);
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, [user]);

	useEffect(() => {
		const getNotes = async () => {
			if (user) {
				const q = query(
					notesCollectionRef,
					where("uid", "==", user.uid)
				);
				const data = await getDocs(q)
        setNotes(
          data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        )
			}
		};

		getNotes();
	}, []);

	if (user)
		return (
			<div className="h-screen px-4">
				<Head>
					<title>Keep</title>
				</Head>
				<header className="h-[60px] border-b-[1.5px] flex justify-between items-center px-5">
					<h1 className="text-3xl">Keep</h1>
					<button onClick={() => signOut(auth)} className="text-3xl">
						<HiOutlineLogout />
					</button>
				</header>
				<NewNote />
				<div>
          {
            notes.map(note => <Note key={note.id} id={note.id} text={note.noteText} title={note.noteTitle} />)
          }
				</div>
			</div>
		);
}
