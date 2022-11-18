import { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAdd } from "react-icons/md";
import { addDoc } from "firebase/firestore";
import { auth, notesCollectionRef } from "../firebase";
import {notesContext} from "../pages/index"

export default function NewNote() {
	const [active, setActive] = useState(true);
	const [noteTitle, setNoteTitle] = useState("");
	const [noteText, setNoteText] = useState("");
	const [user] = useAuthState(auth);
	const useNotes = useContext(notesContext)


	const addNote = async () => {
		if (user) {
			await addDoc(notesCollectionRef, {
				noteTitle,
				noteText,
				uid: user.uid,
			});
		}
		setNoteTitle("")
		setNoteText("")
	};

	return (
		<div className="max-w-[600px] my-[15px] mx-auto px-3 py-5 rounded-md relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
			<input
				className="w-full outline-none font-bold"
				type="text"
				placeholder="Title"
				onChange={(e) => setNoteTitle(e.target.value)}
				value={noteTitle}
				// onFocus={() => setActive(true)}
			/>
			<TextareaAutosize
				className={`w-full outline-none mt-2 resize-none ${
					active ? "block" : "hidden"
				}`}
				placeholder="Take a note."
				onChange={(e) => setNoteText(e.target.value)}
				value={noteText}
			/>
			<button
				onClick={addNote}
				className="absolute right-5 text-white text-4xl p-1 rounded-full bg-yellow-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
			>
				<MdAdd />
			</button>
		</div>
	);
}
