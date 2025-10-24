"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useState } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState<boolean>();
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      toast.success("You’ve been logged out");
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-background/80 border-b backdrop-blur-sm">
      <Link href="/" className="text-lg font-semibold">
        Notely
      </Link>

      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/notes">My Notes</Link>
            </Button>
            <Button
              className="cursor-pointer"
              onClick={handleLogout}
              variant="destructive"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
