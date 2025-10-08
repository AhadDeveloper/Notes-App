"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default function Notes() {
  return (
    <div>
      Notes
      <Button onClick={async () => await logout()}>Logout</Button>
    </div>
  );
}
