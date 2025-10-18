import { getNotes } from "@/lib/actions/notes";
import NoteCard from "./NoteCard";

export default async function NotesList() {
  const { data: notes, error } = await getNotes();

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
