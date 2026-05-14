import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import RenderView from "./components/RenderView";
import AgentView from "./components/AgentView";
import MiniArchiView from "./components/MiniArchiView";
import ProjectsView from "./components/ProjectsView";
import SettingsView from "./components/SettingsView";
import { ViewType } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X } from "lucide-react";

export default function App() {
  const [view, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem("forma_view");
    return (saved as ViewType) || "dashboard";
  });
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("forma_view", view);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case "dashboard": return <DashboardHome />;
      case "render": return <RenderView />;
      case "agent": return <AgentView />;
      case "miniarchi": return <MiniArchiView />;
      case "projects": return <ProjectsView />;
      case "settings": return <SettingsView />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {!isPresentationMode && <Sidebar currentView={view} setView={setView} />}
      
      <main className={cn(
        "flex-1 transition-all duration-500",
        !isPresentationMode ? "md:ml-64 p-4 md:p-10" : "p-0"
      )}>
        {/* Presentation Toggle Overlay */}
        <button 
          onClick={() => setIsPresentationMode(!isPresentationMode)}
          className={cn(
            "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-2xl transition-all hover:scale-110 active:scale-95 gold-glow",
            isPresentationMode ? "bg-red-500" : "bg-primary"
          )}
        >
          {isPresentationMode ? <X size={24} /> : <Maximize2 size={24} />}
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={view + (isPresentationMode ? "_full" : "_normal")}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              !isPresentationMode ? "md:pt-0 pt-16" : "h-screen w-screen overflow-auto p-10 bg-black"
            )}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Helper needed here local too if I use it
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}


