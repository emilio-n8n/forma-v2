import { Box, ArrowRight, Zap, Cpu, Image as ImageIcon, Shield } from "lucide-react";
import { cn } from "../lib/utils";

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-8 h-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Box className="w-10 h-10 text-primary" />
          <span className="text-3xl font-bold tracking-tighter text-foreground">FORMA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Render AI</a>
          <a href="#" className="hover:text-primary transition-colors">Agent IA</a>
          <a href="#" className="hover:text-primary transition-colors">Projets</a>
          <a href="#" className="hover:text-primary transition-colors">Tarifs</a>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          Accéder à FORMA
        </button>
      </nav>

      <main className="relative z-10 pt-20 pb-32 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest animate-bounce">
            <Zap size={14} /> Nouvel Agent Archi v2.0
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
            L'OS Intelligent pour <span className="text-primary italic">Architectes.</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Combinez la puissance du Render AI photoréaliste et d'un Agent IA expert en réglementation française pour diviser votre temps de conception par 10.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <button 
              onClick={onStart}
              className="w-full md:w-auto px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              Démarrer le Workspace
              <ArrowRight size={24} />
            </button>
            <button className="w-full md:w-auto px-8 py-5 bg-secondary border border-border rounded-2xl font-bold text-lg hover:text-primary hover:border-primary/50 transition-all">
              Explorer les Renders
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
          {[
            { icon: ImageIcon, title: "Render AI", desc: "Des visuels 8K en 30 secondes à partir d'esquisses ou de modèles 3D." },
            { icon: Cpu, title: "Agent Expert", desc: "Spécialisé en PLU, RT2020 et normes françaises pour une conformité totale." },
            { icon: Shield, title: "Projets Sécurisés", desc: "Une gestion de dossier centralisée avec historique et collaboration temps réel." },
          ].map((feature) => (
            <div key={feature.title} className="p-10 bg-secondary/50 border border-border rounded-3xl backdrop-blur-sm hover:border-primary/40 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-border mt-20 max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
        <p>© 2024 Studio FORMA. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
