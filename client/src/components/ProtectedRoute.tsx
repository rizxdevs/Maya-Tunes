import { Route } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  component: Component,
  ...rest
}: any) {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return <Route {...rest} component={Component} />;
}
