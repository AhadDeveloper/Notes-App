"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, SignupFormData } from "@/lib/validations/authSchema";
import { signup } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupHandler = async (data: SignupFormData) => {
    console.log(data);
    const response = await signup(data);

    if (response.error) {
      console.log(response.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 justify-center">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="flex flex-col gap-4"
      >
        <div>
          <label>First Name: </label>
          <Input id="first_name" {...register("first_name")} />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div>
          <label>Second Name: </label>
          <Input id="last_name" {...register("last_name")} />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        <div>
          <label>Email: </label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password: </label>
          <Input id="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button>Signup</Button>
      </form>
    </div>
  );
}
