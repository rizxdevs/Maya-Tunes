import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import ProtectedRoute from "@/components/ProtectedRoute";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import ServerList from "@/pages/ServerList";
import ServerView from "@/pages/ServerView";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Landing} />

      {/* Protected */}
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/servers" component={ServerList} />
      <ProtectedRoute path="/servers/:id" component={ServerView} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
