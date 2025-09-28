import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- IMPORT AUTH COMPONENTS ---
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
// ----------------------------

import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import TrackIssues from "./pages/TrackIssues";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      {/* AuthProvider wraps all routes to provide auth state */}
        <AuthProvider>
          <Routes>
            {/* The Login page is a public route outside the main layout */}
            <Route path="/login" element={<Login />} />

            {/* The main app layout is protected */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="report" element={<ReportIssue />} />
              <Route path="track" element={<TrackIssues />} />
              <Route path="community" element={<Community />} />
            </Route>

            {/* Catch-all route for pages that don't exist */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;