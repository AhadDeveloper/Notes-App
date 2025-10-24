"use client";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-muted/30 flex flex-col items-center px-6 py-16">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3">Welcome to Notely</h1>
          <p className="text-muted-foreground mb-8">
            Capture ideas, organize your thoughts, and stay productive — all in
            one place.
          </p>

          {!user ? (
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <Button asChild>
                <Link href="/notes">Go to My Notes</Link>
              </Button>
            </div>
          )}
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {[
            {
              title: "Quick Notes",
              desc: "Write your thoughts instantly without losing focus.",
            },
            {
              title: "Organize",
              desc: "Group your notes with categories or tags to stay structured.",
            },
            {
              title: "Archive & Restore",
              desc: "Keep your workspace clean with easy archiving options.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
