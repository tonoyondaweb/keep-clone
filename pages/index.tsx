import { createContext, useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, notesCollectionRef } from "../firebase";
import NewNote from "../components/NewNote";
import Popup from "../components/Popup";
import NotesList from "../components/NotesList";
import Header from "../components/Header";
import { get } from "https";

export const notesContext = createContext<any>(() => console.log("context"));

export default function Index() {
	const [notes, setNotes] = useState<any>([]);
	const [popUp, setPopUp] = useState<boolean>(false);
	const [currentNoteId, setCurrentNoteId] = useState<string>("avcd");
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, [user]);

	useEffect(() => {
		const getNotes = () => {
			if (user) {
				const q = query(
					notesCollectionRef,
					where("uid", "==", user.uid)
				);
				onSnapshot(q, (snapshot) => {
					setNotes(
						snapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						}))
					);
				});
			}
		};

		getNotes()
	}, []);

	if (user)
		return (
			<notesContext.Provider value={{ setCurrentNoteId, setPopUp, notes }}>
				<div className="h-screen px-4">
					<Head>
						<title>Keep</title>
					</Head>
					<Header />
					<NewNote />
					<NotesList />
					<Popup popup={popUp} currentNoteId={currentNoteId} />
				</div>
			</notesContext.Provider>
		);
}
