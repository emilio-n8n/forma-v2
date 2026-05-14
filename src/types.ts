export type ViewType = "render" | "agent" | "miniarchi" | "projects" | "settings" | "dashboard";

export interface Project {
  id: string;
  title: string;
  status: "active" | "completed" | "on-hold";
  createdAt: number;
  tags: string[];
}

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface Artifact {
  id: string;
  type: "slideshow" | "spreadsheet" | "dataviz" | "website" | "document" | "moodboard";
  title: string;
  content: string;
  mime_type: string;
}

export interface MCPServer {
  id: string;
  name: string;
  command: string;
  enabled: boolean;
}
