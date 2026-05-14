import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, Grid } from "@react-three/drei";
import { useState, Suspense } from "react";
import { 
  Maximize2, 
  Rotate3d, 
  Layers, 
  Coins, 
  FileOutput, 
  Split,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { cn } from "../lib/utils";

function BuildingModel() {
  return (
    <group>
      {/* Sample minimalist building massing */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 8]} />
        <meshStandardMaterial color="#C4A264" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 3, 2]}>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#C4A264" transparent opacity={0.8} />
      </mesh>
      {/* Floor plates */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

export default function MiniArchiView() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  const budgetOptions = [
    { label: "Économique", range: "80k - 120k €", color: "text-blue-400" },
    { label: "Moyen", range: "150k - 250k €", color: "text-primary" },
    { label: "Haut de gamme", range: "400k+ €", color: "text-purple-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Mini Archi</h2>
          <p className="text-muted-foreground">Générez et comparez des plans de masse 3D en quelques secondes.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:text-primary transition-colors">
            <Split size={16} />
            Comparateur
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <Plus size={16} />
            Nouveau Projet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="space-y-6 lg:order-1">
          <div className="p-6 bg-secondary/50 rounded-2xl border border-border">
            <h3 className="font-bold mb-4 opacity-50 uppercase text-[10px] tracking-widest flex items-center gap-2">
              <Coins size={12} className="text-primary" />
              Estimateur Budget
            </h3>
            <div className="space-y-3">
              {budgetOptions.map((opt) => (
                <button 
                  key={opt.label}
                  className="w-full p-4 bg-muted border border-border rounded-xl text-left hover:border-primary/50 transition-all group"
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-60 group-hover:text-primary">{opt.label}</p>
                  <p className={cn("text-lg font-bold", opt.color)}>{opt.range}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-secondary/50 rounded-2xl border border-border">
            <h3 className="font-bold mb-4 opacity-50 uppercase text-[10px] tracking-widest flex items-center gap-2">
              <Layers size={12} className="text-primary" />
              Plans Générés
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedPlan(i)}
                  className={cn(
                    "aspect-square rounded-xl border-2 flex items-center justify-center transition-all",
                    selectedPlan === i 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border bg-muted text-muted-foreground hover:border-border/80"
                  )}
                >
                  <span className="font-bold">v.{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative aspect-[16/9] bg-secondary rounded-2xl border border-border overflow-hidden ring-1 ring-primary/10 gold-glow">
            <Canvas shadows>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
                <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.2, blur: 3 }} adjustCamera={false}>
                  <BuildingModel />
                </Stage>
                <Grid 
                  infiniteGrid 
                  fadeDistance={30} 
                  cellColor="#C4A264" 
                  sectionColor="#C4A264" 
                  sectionSize={5} 
                  cellSize={1} 
                  opacity={0.05} 
                />
                <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
              </Suspense>
            </Canvas>

            {/* Overlay Navigation */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg text-foreground hover:text-primary transition-colors">
                <Maximize2 size={20} />
              </button>
              <button className="p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg text-foreground hover:text-primary transition-colors">
                <Rotate3d size={20} />
              </button>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full">
              <button className="p-1 hover:text-primary transition-colors"><ChevronLeft size={24} /></button>
              <span className="text-sm font-bold tracking-widest uppercase">Variation {selectedPlan + 1}</span>
              <button className="p-1 hover:text-primary transition-colors"><ChevronRight size={24} /></button>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-muted border border-border rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:text-primary hover:border-primary/50 transition-all">
              <FileOutput size={18} />
              Exporter STL
            </button>
            <button className="flex-1 py-4 bg-muted border border-border rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:text-primary hover:border-primary/50 transition-all">
              <FileOutput size={18} />
              Export Plans (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
