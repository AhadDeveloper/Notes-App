import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";
import ClientAuthProvider from "@/components/auth/ClientAuthProvider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return <ClientAuthProvider user={user}>{children}</ClientAuthProvider>;
}
