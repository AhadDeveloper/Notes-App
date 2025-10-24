"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "../supabase/server";
import { SignupFormData, LoginFormData } from "../validations/authSchema";

export const signup = async (data: SignupFormData) => {
  const supabase = await createSupabaseServerClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user" };
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
};

export const login = async (data: LoginFormData) => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
};

export const logout = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return { success: true };
};

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
