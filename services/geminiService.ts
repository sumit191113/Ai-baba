
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Message } from "../types";

export class AIHandler {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor(systemInstruction: string) {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.8,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage({ message });
      return result.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Pranam/Hello. I am having trouble connecting right now. Please try again in a moment.";
    }
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const stream = await this.chat.sendMessageStream({ message });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      onChunk(" [Connection lost. Please try again.]");
    }
  }
}
