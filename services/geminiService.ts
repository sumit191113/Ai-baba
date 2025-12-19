
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

export class AIHandler {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor(systemInstruction: string) {
    // GUIDELINE: Always use named parameter for apiKey and use process.env.API_KEY directly
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const stream = await this.chat.sendMessageStream({ message });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        // GUIDELINE: Use .text property to access content directly
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      onChunk("\n[An unexpected error occurred. Please refresh the connection.]");
    }
  }
}
