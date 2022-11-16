import { useContext } from "react";
import { notesContext } from "../pages/index";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdDelete } from "react-icons/md";

interface props {
	popup: boolean;
	currentNote: { id: string; title: string; text: string };
}

export default function Popup({ popup, currentNote }: props) {
	const useNotes = useContext(notesContext);
	const { id, title, text } = currentNote;

	const deleteNote = async() => {
		await deleteDoc(doc(db, "notes", id))
        .catch(err => console.log(err))
        useNotes.getNotes()
        useNotes.setPopUp(false)
	};

	return popup ? (
		<div className="fixed left-0 top-0 w-screen h-screen bg-black/75 grid place-items-center">
			<div className="w-[600px] bg-white text-gray-600 p-[25px] rounded-xl">
				<h1 className="text-3xl font-semibold">{title}</h1>
				<hr />
				<p className="mt-5">{text}</p>
				<div className="flex justify-between mt-5">
					<button onClick={deleteNote} className="text-2xl rounded-full bg-gray-200 py-2 px-5 text-black-500 transition-colors hover:bg-gray-300">
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
