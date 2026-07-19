import { Router as WouterRouter } from "wouter";
import Layout from "./components/layout/layout";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UnsaveContextProvider } from "@/features/context/unsave-context";
import { ThemeProvider } from "@/lib/theme";

export default function App() {
  return (
    <ThemeProvider>
      <UnsaveContextProvider>
        <TooltipProvider>
          <WouterRouter
            base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}
          >
            <Layout />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </UnsaveContextProvider>
    </ThemeProvider>
  );
}
