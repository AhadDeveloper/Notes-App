"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validations/authSchema";
import { login } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = async (data: LoginFormData) => {
    console.log(data);
    const response = await login(data);

    if (response.error) {
      console.log(response.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label>Email</label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <Input id="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}
