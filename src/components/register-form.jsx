import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router";
import { register as userRegister } from "@/service/auth-service";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useAuth } from "@/context/auth-provider";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const RegisterForm = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, authLoading } = useAuth();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      await userRegister({
        username: values.username,
        password: values.password,
      });

      const user = await authMe();
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        error?.response?.data || {
          error: "Registration failed",
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your username and password to register
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
                  placeholder="johndoe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
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

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2Icon className="animate-spin" />}
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
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
};

export default RegisterForm;
