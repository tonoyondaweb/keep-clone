import { createContext, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, notesCollectionRef } from "../firebase";
import { HiOutlineLogout } from "react-icons/hi";
import NewNote from "../components/NewNote";
import Note from "../components/Note";
import Popup from "../components/Popup";

export const notesContext = createContext<any>(() => console.log("context"));

export default function Index() {
	const [notes, setNotes] = useState<any>([]);
	const [popUp, setPopUp] = useState<boolean>(false);
	const [currentNote, setCurrentNote] = useState<any>({
		id: "",
		title: "",
		text: "",
	});
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, [user]);

	const getNotes = async () => {
		if (user) {
			const q = query(notesCollectionRef, where("uid", "==", user.uid));
			const data = await getDocs(q);
			// data.docs.forEach(doc => console.log({...doc.data(), id: doc.id}))
			setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		}
	};

	useEffect(() => {
		getNotes();
	}, []);

	const openNote = (noteData: any) => {
		const { id, title, text } = noteData;
		setCurrentNote({ id, title, text });
    setPopUp(true)
	};

	if (user)
		return (
			<notesContext.Provider value={{ getNotes, setPopUp, openNote }}>
				<div className="h-screen px-4">
					<Head>
						<title>Keep</title>
					</Head>
					<header className="h-[60px] border-b-[1.5px] flex justify-between items-center px-5">
						<h1 className="text-3xl">Keep</h1>
						<button
							onClick={() => signOut(auth)}
							className="text-3xl"
						>
							<HiOutlineLogout />
						</button>
					</header>
					<NewNote />
					<main className="max-w-[1000px] mx-auto mt-11 px-3 grid gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4">
						{notes.map((note: any) => (
							<Note
								key={note.id}
								id={note.id}
								text={note.noteText}
								title={note.noteTitle}
							/>
						))}
						<Popup popup={popUp} currentNote={currentNote} />
					</main>
				</div>
			</notesContext.Provider>
		);
}
