import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return <>{children}</>;
}
