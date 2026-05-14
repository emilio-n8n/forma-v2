import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Cpu, 
  Box, 
  FolderKanban, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { ViewType } from "../types";
import { cn } from "../lib/utils";
import { useState } from "react";

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export default function Sidebar({ currentView, setView }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "render", label: "FORMA Render", icon: ImageIcon },
    { id: "agent", label: "FORMA Agent", icon: Cpu },
    { id: "miniarchi", label: "Mini Archi", icon: Box },
    { id: "projects", label: "Projets", icon: FolderKanban },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 md:hidden bg-secondary border border-border rounded-lg text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-secondary border-r border-border transition-transform duration-300 md:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tighter text-primary flex items-center gap-2">
              <Box className="w-8 h-8" />
              FORMA
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 opacity-50">Architectural AI OS</p>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as ViewType);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  currentView === item.id 
                    ? "bg-primary text-primary-foreground gold-glow" 
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  currentView === item.id ? "text-primary-foreground" : "group-hover:text-primary"
                )} />
                {item.label}
                {currentView === item.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
                EA
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">Emilio Architecte</p>
                <p className="text-[10px] text-muted-foreground truncate opacity-50">Pro Plan</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors group">
              <LogOut className="w-5 h-5 group-hover:text-red-400" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
