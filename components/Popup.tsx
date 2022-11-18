import { useContext, useEffect, useState } from "react";
import { notesContext } from "../pages/index";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdDelete } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

interface props {
	popup: boolean;
	currentNoteId: string;
}

export default function Popup({ popup, currentNoteId }: props) {
	const useNotes = useContext(notesContext);
	const [note, setNote] = useState({
		noteTitle: "",
		noteText: "",
	});
	
	const noteRef = doc(db, "notes", currentNoteId);

	useEffect(() => {
		useNotes.notes.forEach(
			(noteItem: { id: string; noteTitle: string; noteText: string }) => {
				if (noteItem.id === currentNoteId) {
					setNote({
						noteTitle: noteItem.noteTitle,
						noteText: noteItem.noteText,
					});
				}
			}
		);
	}, [currentNoteId]);

	const deleteNote = async () => {
		useNotes.setPopUp(false);
		await deleteDoc(noteRef).catch((err) => console.log(err));
	};

	useEffect(() => {
		const editNote = async () => {
			await updateDoc(noteRef, note)
				.then((note) => console.log(note))
				.catch((err) => console.log(err));
		};

		editNote();
	}, [note]);

	const handleInput = (e: any) => {
		setNote((prevNote) => ({
			...prevNote,
			[e.target.name]: e.target.value,
		}));
	};

	return popup ? (
		<div className="fixed left-0 top-0 w-screen h-screen bg-black/75 grid place-items-center">
			<div className="h-full w-full bg-white text-gray-600 p-[25px] min-[600px]:rounded-xl min-[600px]:h-max min-[600px]:max-w-[500px] flex flex-col justify-between">
				<div className="flex-1">
					<input
						className="text-3xl font-semibold outline-none"
						type="text"
						name="noteTitle"
						value={note.noteTitle}
						onChange={handleInput}
					/>
					<hr />
					<textarea
						className="w-full h-full resize-none mt-5 outline-none"
						name="noteText"
						value={note.noteText}
						onChange={handleInput}
					></textarea>
				</div>
				<div className="flex justify-between mt-5">
					<button
						onClick={deleteNote}
						className="text-2xl rounded-full bg-gray-200 py-2 px-5 text-black-500 transition-colors hover:bg-gray-300"
					>
						<MdDelete />
					</button>
					<button
						onClick={() => useNotes.setPopUp(false)}
						className="rounded-full bg-gray-200 py-2 px-5 text-black-500 transition-colors hover:bg-gray-300"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
