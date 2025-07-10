"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // ✅ ADD THIS
import z from "zod";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { authMe, login } from "@/service/auth-service";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useAuth } from "@/context/auth-provider";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, authLoading } = useAuth();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await login(values);
      const user = await authMe();
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error?.response?.data || {
          error: "Login failed",
          message: "Please try again",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  if (authLoading) {
    return (
      <div
        className={cn("flex flex-col gap-2 items-center", className)}
        {...props}
      >
        <Loader2Icon className="animate-spin" />
        <div>Authenticating...</div>
      </div>
    );
  }

  if (user) {
    return (
      <Alert>
        <CheckCircle2Icon className="h-5 w-5" />
        <AlertTitle>You are already logged in</AlertTitle>
        <AlertDescription>Redirecting to your dashboard...</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {errorMessage && (
                <div>
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{errorMessage?.error}</AlertTitle>
                    <AlertDescription>
                      <p>{errorMessage?.message}</p>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndeo"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  disabled={loading}
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>{" "}
              or{" "}
              <a href="/" className="underline underline-offset-4">
                Back to home
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
