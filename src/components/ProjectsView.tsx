import { 
  FolderKanban, 
  Calendar as CalendarIcon, 
  Search, 
  Filter,
  Plus
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProjectsView() {
  const [activeTab, setActiveTab] = useState<"kanban" | "list" | "calendar">("kanban");

  const projects = [
    { id: 1, title: "Extension Villa Cap Ferret", client: "Famille Martin", status: "In Progress", type: "Rénovation", tags: ["RE2020", "Piscine"] },
    { id: 2, title: "Bureaux Start-up Lyon", client: "TechCorp", status: "Design", type: "Tertiaire", tags: ["BIM", "Open Space"] },
    { id: 3, title: "Maison Passive Alpin", client: "J. Dupont", status: "Final Check", type: "Résidentiel", tags: ["BBC", "Bois"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion de Projets</h2>
          <p className="text-muted-foreground">Suivez vos chantiers et collaborations en temps réel.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-secondary p-1 rounded-lg border border-border flex gap-1">
            {(["kanban", "list", "calendar"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all",
                  activeTab === tab ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
            <Plus size={16} />
            Créer
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-secondary/50 p-4 border border-border rounded-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Filtrer par nom, client ou tag..." 
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm hover:border-primary/50 transition-colors">
          <Filter size={16} />
          Filtres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="p-6 bg-secondary border border-border rounded-2xl group hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">
                {project.type}
              </span>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Search size={16} />
              </button>
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-muted border border-border rounded-full opacity-70">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-secondary bg-muted flex items-center justify-center text-[10px] font-bold">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5 text-xs">
                  <FolderKanban size={14} /> 12
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <CalendarIcon size={14} /> 2j
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New */}
        <button className="p-6 bg-secondary border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all group">
          <div className="p-3 rounded-full bg-muted border border-border group-hover:gold-glow transition-all">
            <Plus size={24} />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest">Nouveau Projet</p>
        </button>
      </div>
    </div>
  );
}
