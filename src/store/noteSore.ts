import type { Note } from "@/types";
import { create } from "zustand";

interface NoteStore {
  notes: Note[];
  archivedNotes: Note[];

  setNotes: (notes: Note[]) => void;
  setArchiveNotes: (archivedNotes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  toggleArchive: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  archivedNotes: [],
  setNotes: (notes) => set({ notes }),
  setArchiveNotes: (archivedNotes) => set({ archivedNotes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? note : n)),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      archivedNotes: state.archivedNotes.filter((n) => n.id !== id),
    })),
  toggleArchive: (id) =>
    set((state) => {
      const noteToToggle =
        state.notes.find((n) => n.id === id) ||
        state.archivedNotes.find((n) => n.id === id);

      if (!noteToToggle) return state;

      const updatedNote = {
        ...noteToToggle,
        is_archived: !noteToToggle.is_archived,
      };

      if (noteToToggle.is_archived) {
        // move to active
        return {
          notes: [updatedNote, ...state.notes],
          archivedNotes: state.archivedNotes.filter((n) => n.id !== id),
        };
      } else {
        // move to archive
        return {
          notes: state.notes.filter((n) => n.id !== id),
          archivedNotes: [updatedNote, ...state.archivedNotes],
        };
      }
    }),
}));
