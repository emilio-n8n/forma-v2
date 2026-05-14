import { 
  Search, 
  Bell, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Users, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function DashboardHome() {
  const stats = [
    { label: "Projets Actifs", value: "12", icon: TrendingUp, delta: "+2 ce mois" },
    { label: "Rendus Temps Réel", value: "148", icon: Clock, delta: "7.2h total" },
    { label: "Collaborateurs", value: "6", icon: Users, delta: "Workspace Pro" },
    { label: "Tâches Complétées", value: "89%", icon: CheckCircle2, delta: "Efficacité ++" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bonjour Emilio,</h2>
          <p className="text-muted-foreground">Voici l'état de votre agence aujourd'hui.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher un dossier..." 
              className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-full text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all w-64"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] text-muted-foreground">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] text-muted-foreground">K</kbd>
            </div>
          </div>
          <button className="p-2 bg-secondary border border-border rounded-full text-muted-foreground hover:text-primary relative group transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full group-hover:animate-ping" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-secondary border border-border rounded-2xl gold-glow group hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.delta}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="text-primary" />
            Agenda & Activité
          </h3>
          <div className="p-6 bg-secondary border border-border rounded-2xl space-y-6">
            {[
              { type: "render", title: "Villa Cap Ferret - Render Final", time: "Il y a 2h", state: "Terminé" },
              { type: "agent", title: "Analyse PLU - Secteur Marais", time: "Il y a 5h", state: "En cours" },
              { type: "project", title: "Réunion client - Agence Forma", time: "Demain 10:00", state: "À venir" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-primary group-hover:gold-glow transition-all">
                    {activity.type === 'render' ? <TrendingUp size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-muted border border-border rounded-md opacity-60">
                    {activity.state}
                  </span>
                  <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Raccourcis</h3>
          <div className="grid gap-4">
            <button className="p-6 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-between group hover:scale-[1.02] transition-transform">
              <span>Lancer un Render AI</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="p-6 bg-secondary border border-border rounded-2xl flex flex-col gap-4">
              <p className="text-sm font-medium text-muted-foreground">Espace de stockage</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-primary" />
              </div>
              <p className="text-xs font-bold">6.5 GB / 10 GB</p>
              <button className="text-xs text-primary font-bold hover:underline text-left">Augmenter mon forfait →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
