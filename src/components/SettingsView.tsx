import { 
  User, 
  Shield, 
  Zap, 
  Cpu, 
  Globe, 
  Key,
  Smartphone,
  Save
} from "lucide-react";
import { cn } from "../lib/utils";

export default function SettingsView() {
  const sections = [
    { title: "Profil", icon: User },
    { title: "Workspace", icon: Shield },
    { title: "Intégrations", icon: Zap },
    { title: "MCP Servers", icon: Cpu },
    { title: "Domaines & SEO", icon: Globe },
    { title: "Facturation", icon: Key },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">Gérez votre compte, votre équipe et les outils IA de FORMA.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
          <Save size={18} />
          Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="space-y-1">
          {sections.map((section, i) => (
            <button 
              key={section.title}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <section.icon size={18} />
              {section.title}
            </button>
          ))}
        </nav>

        <div className="md:col-span-3 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="p-8 bg-secondary border border-border rounded-2xl space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-3xl font-bold gold-glow ring-4 ring-primary/5">
                EA
              </div>
              <div>
                <h3 className="text-xl font-bold">Emilio Architecte</h3>
                <p className="text-sm text-muted-foreground mb-3">ID: FORMA-2024-USR-8912</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-muted border border-border rounded-md text-[10px] font-bold uppercase tracking-tighter hover:text-primary transition-colors">Changer l'avatar</button>
                  <button className="px-3 py-1 bg-red-400/10 border border-red-400/20 text-red-100 text-[10px] font-bold uppercase tracking-tighter hover:bg-red-400/20 transition-colors">Supprimer</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nom complet</label>
                <input type="text" defaultValue="Emilio Architecte" className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Professionnel</label>
                <input type="email" defaultValue="emilio.developpeur@gmail.com" className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nom d'agence</label>
                <input type="text" defaultValue="Studio FORMA Architecture" className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Numéro Ordre</label>
                <input type="text" defaultValue="A78912" className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-secondary border border-border rounded-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="text-primary" />
              Configuration MCP Servers
            </h3>
            <p className="text-sm text-muted-foreground mb-8">Connectez vos propres serveurs de contexte pour enrichir FORMA Agent.</p>
            
            <div className="space-y-4">
              {[
                { name: "Filesystem Context", status: "Enabled", command: "npm run mcp-fs" },
                { name: "SIRC Code Search", status: "Disabled", command: "npx search-mcp" }
              ].map(mcp => (
                <div key={mcp.name} className="flex items-center justify-between p-4 bg-muted border border-border rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-2 h-2 rounded-full", mcp.status === "Enabled" ? "bg-primary animate-pulse" : "bg-muted-foreground")} />
                    <div>
                      <p className="font-bold text-sm">{mcp.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{mcp.command}</p>
                    </div>
                  </div>
                  <button className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                    mcp.status === "Enabled" ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary/50"
                  )}>
                    {mcp.status === "Enabled" ? "Actif" : "Activer"}
                  </button>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-primary transition-all">
                + Ajouter un Endpoint MCP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
