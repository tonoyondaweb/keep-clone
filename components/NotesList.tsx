import { useContext } from "react";
import { notesContext } from "../pages/index";
import Note from "./Note";

export default function NotesList() {
	const useNotes = useContext(notesContext);

	return useNotes.notes.length > 0 ? (
		<main className="max-w-[1000px] mx-auto mt-11 px-3 grid gap-5 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 xl:grid-cols-4">
			{useNotes.notes.map((note: any) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.noteText}
					title={note.noteTitle}
				/>
			))}
		</main>
	) : (
		<h1 className="text-5xl text-center mt-11 text-gray-400">No Notes :(</h1>
	);
}
