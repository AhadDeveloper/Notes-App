"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@supabase/supabase-js";

export default function ClientAuthProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return <>{children}</>;
}
