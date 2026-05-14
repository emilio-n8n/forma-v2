import { ChatMessage } from "../types";

export const chatService = {
  async sendMessage(message: string, history: ChatMessage[]) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  },
};
