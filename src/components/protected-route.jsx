import { useAuth } from "@/context/auth-provider";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading)
    return (
      <div className="w-full h-full gap-2 flex flex-col items-center justify-center">
        <Loader2Icon className="animate-spin" />
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
