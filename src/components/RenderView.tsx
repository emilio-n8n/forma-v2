import { 
  History, 
  Layout, 
  Moon, 
  Sun, 
  Download, 
  Maximize2,
  Trash2,
  Check,
  Plus
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function RenderView() {
  const [isNight, setIsNight] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const styles = [
    "Modernisme Suisse", "Brutalisme", "Minimalisme Japonais", "Neo-Haussmannien", "Eco-Construction"
  ];

  const handleUpload = () => {
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">FORMA Render</h2>
          <p className="text-muted-foreground">Transformez vos esquisses en visuels photoréalistes.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:text-primary transition-colors">
            <History size={16} />
            Historique
          </button>
          <button 
            onClick={handleUpload}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Plus size={16} />
            Nouveau Render
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Render Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-secondary rounded-2xl border border-border overflow-hidden group">
            {!isUploading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl m-4">
                <Layout size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium mb-1">Glissez une image ou un modèle 3D</p>
                <p className="text-sm opacity-50">Formats supportés: PNG, JPG, GLB, SKP</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm z-10">
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mb-4">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-primary font-bold animate-pulse">{progress}% - Analyse du modèle...</p>
              </div>
            )}
            
            {/* Overlay Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setIsNight(!isNight)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isNight ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-white/10"
                )}
              >
                {isNight ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <div className="w-[1px] h-4 bg-white/20 mx-1" />
              <button className="p-2 text-foreground hover:bg-white/10 rounded-full transition-colors"><Maximize2 size={20} /></button>
              <button className="p-2 text-foreground hover:bg-white/10 rounded-full transition-colors"><Download size={20} /></button>
              <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"><Trash2 size={20} /></button>
            </div>
          </div>

          <div className="p-6 bg-secondary rounded-2xl border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Layout className="w-4 h-4 text-primary" />
              Configuration du style
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {styles.map((s) => (
                <button 
                  key={s}
                  className="px-4 py-3 bg-muted border border-border rounded-xl text-xs font-medium hover:border-primary/50 transition-all text-left group"
                >
                  <span className="group-hover:text-primary">{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="p-6 bg-secondary/50 rounded-2xl border border-border backdrop-blur-sm">
            <h3 className="font-bold mb-4 opacity-50 uppercase text-[10px] tracking-widest">Paramètres d'éclairage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Intensité Solaire</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span>Température de couleur</span>
                  <span className="text-primary">4500K</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-secondary/50 rounded-2xl border border-border backdrop-blur-sm">
            <h3 className="font-bold mb-4 opacity-50 uppercase text-[10px] tracking-widest">Post-Processing</h3>
            <div className="space-y-3">
              {['Ray Tracing', 'Ambient Occlusion', 'Denoise'].map(f => (
                <div key={f} className="flex items-center justify-between text-sm">
                  <span>{f}</span>
                  <div className="w-10 h-5 bg-primary/20 rounded-full relative p-1 cursor-pointer">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
