import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/services/api";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { loginResponse } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post<loginResponse>("/auth/login", data);

      login(response.data.accessToken, response.data.user);

      toast.success("Welcome back!");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to Task Manager
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <div className="pt-2 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Create one
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
