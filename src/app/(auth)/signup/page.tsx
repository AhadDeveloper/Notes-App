"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signupSchema, SignupFormData } from "@/lib/validations/authSchema";
import { signup } from "@/lib/actions/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupHandler = async (data: SignupFormData) => {
    const response = await signup(data);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Account created successfully!");
      router.push("/notes");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card/70 backdrop-blur-sm border border-border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Create an Account
        </h1>{" "}
        <p className="text-sm text-muted-foreground text-center mb-6">
          Join Notely and start organizing your notes today.
        </p>
        <form onSubmit={handleSubmit(signupHandler)} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium mb-1"
            >
              First Name
            </label>
            <Input
              id="first_name"
              {...register("first_name")}
              placeholder="John"
              className="w-full"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <Input
              id="last_name"
              {...register("last_name")}
              placeholder="Doe"
              className="w-full"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="********"
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?
            <Link href="/login" className="underline text-blue-600 ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
