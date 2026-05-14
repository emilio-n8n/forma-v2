import { 
  Send, 
  Paperclip, 
  FileText, 
  Database, 
  Calculator,
  Search,
  MessageSquare
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { chatService } from "../services/chatService";
import { cn } from "../lib/utils";
import ReactMarkdown from "react-markdown";

export default function AgentView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: input }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(input, messages);
      const modelMessage: ChatMessage = {
        role: "model",
        parts: [{ text: response.text }]
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        role: "model",
        parts: [{ text: "Désolé, une erreur est survenue lors de la communication avec l'IA." }]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <MessageSquare className="text-primary" />
          FORMA Agent
        </h2>
        <p className="text-muted-foreground">Expert en architecture, réglementations (PLU, RT2020) et gestion de projet.</p>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pb-6 scroll-smooth scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-secondary border border-border flex items-center justify-center text-primary gold-glow">
              <MessageSquare size={32} />
            </div>
            <div>
              <p className="text-lg font-medium">Comment puis-je vous aider aujourd'hui ?</p>
              <p className="text-sm text-muted-foreground">Essayez de me poser des questions sur le PLU de Paris ou sur la norme RE2020.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
              {[
                "Vérifier la conformité RE2020 de ce projet",
                "Générer un descriptif technique lot gros œuvre",
                "Calculer l'emprise maximale au sol zone UR",
                "Optimiser l'exposition bioclimatique"
              ].map(q => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-4 py-3 bg-secondary/50 border border-border rounded-xl text-xs text-left hover:border-primary transition-all group"
                >
                  <span className="group-hover:text-primary">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div 
            key={i} 
            className={cn(
              "flex gap-4 p-4 rounded-2xl border transition-all",
              m.role === "user" ? "bg-primary/5 border-primary/20" : "bg-secondary border-border"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
              m.role === "user" ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-primary"
            )}>
              {m.role === "user" ? "EA" : <MessageSquare size={16} />}
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                {m.role === "user" ? "Emilio Architecte" : "FORMA Agent"}
              </p>
              <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                <ReactMarkdown>{m.parts[0].text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 p-4 rounded-2xl bg-secondary border border-border animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-primary opacity-50" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-24 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 p-2 bg-secondary border border-border rounded-2xl gold-glow relative">
        <div className="flex items-center gap-2 p-2">
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Posez votre question à FORMA..."
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        
        {/* Agent Tools Shortcuts */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer capitalize">
            <Database size={12} /> Projets
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer capitalize">
            <Search size={12} /> Web
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer capitalize">
            <Calculator size={12} /> Calculs
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer capitalize">
            <FileText size={12} /> Docs
          </div>
        </div>
      </div>
    </div>
  );
}
