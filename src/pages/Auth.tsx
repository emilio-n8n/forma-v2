import { useState } from "react";
import { Box, ArrowRight, Lock, Mail } from "lucide-react";
import { cn } from "../lib/utils";

interface AuthProps {
  onAuth: (user: any) => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified auth for preview
    onAuth({ email: "emilio.architecte@gmail.com", name: "Emilio" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <Box className="w-12 h-12 text-primary" />
            <span className="text-4xl font-bold tracking-tighter">FORMA</span>
          </div>
          <h1 className="text-3xl font-bold">{isLogin ? "Connexion au Workspace" : "Créer un compte"}</h1>
          <p className="text-muted-foreground">Entrez vos identifiants pour accéder à vos projets.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  required
                  defaultValue="emilio.architecte@gmail.com"
                  placeholder="nom@agence.fr"
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-2xl outline-none focus:border-primary transition-colors font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="password" 
                  required
                  defaultValue="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-2xl outline-none focus:border-primary transition-colors font-medium"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="flex items-center gap-4 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <div className="h-[1px] flex-1 bg-border" />
          OU
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <button className="w-full py-4 bg-muted border border-border rounded-2xl font-bold flex items-center justify-center gap-3 hover:text-primary hover:border-primary/50 transition-all">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0" alt="Google" />
          Continuer avec Google
        </button>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"} 
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold ml-2 hover:underline"
          >
            {isLogin ? "Créer un profil" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
