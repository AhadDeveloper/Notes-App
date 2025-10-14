"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./auth";
import { createSupabaseServerClient } from "../supabase/server";
import { NoteFormData } from "../validations/noteSchema";
import { Note, ActionResult } from "@/types";

const USER_ERROR = "User not authenticated";

export const getNotes = async (
  archived: boolean = false
): Promise<ActionResult<Note[]>> => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_archived", archived)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };
  return { data };
};

export const getArchivedNotes = async (): Promise<ActionResult<Note[]>> => {
  return getNotes(true);
};

export const createNote = async (
  data: NoteFormData
): Promise<ActionResult<Note>> => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { data: noteData, error } = await supabase
    .from("notes")
    .insert({
      user_id: user.id,
      title: data.title,
      content: data.content,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/notes");
  return { data: noteData };
};

export const updateNote = async (
  id: string,
  data: NoteFormData
): Promise<ActionResult<Note>> => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { data: updatedNoteData, error } = await supabase
    .from("notes")
    .update({
      title: data.title,
      content: data.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/notes");
  revalidatePath(`/notes/${id}`);
  return { data: updatedNoteData };
};

export const deleteNote = async (id: string) => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/notes");
  return { success: true };
};

export const getNote = async (id: string): Promise<ActionResult<Note>> => {
  const user = await getUser();
  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
};

export const toggleArchive = async (
  id: string,
  archived: boolean
): Promise<ActionResult<Note>> => {
  const user = await getUser();

  if (!user) {
    return { error: USER_ERROR };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("notes")
    .update({
      is_archived: archived,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(archived ? "/archive" : "/notes");
  return { data };
};
