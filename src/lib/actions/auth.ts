"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "../supabase/server";
import { signupSchema, loginSchema } from "../validations/authSchema";

export const signup = async (formData: FormData) => {
  const supabase = await createSupabaseServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  };

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return z.treeifyError(result.error);
  }

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

  if (profileError) return { error: profileError.message };

  revalidatePath("/", "layout");
  redirect("/notes");
};

export const login = async () => {};

export const logout = async () => {};
