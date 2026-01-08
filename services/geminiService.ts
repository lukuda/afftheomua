
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getPersonalizedStrategy(context: string, platforms: string[]) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tôi muốn làm tiếp thị liên kết tại Việt Nam trên các nền tảng: ${platforms.join(', ')}. 
      Bối cảnh của tôi: ${context}. 
      Hãy đề xuất 3 sản phẩm cụ thể và kịch bản 15-30 giây cho video ngắn (Shorts/Reels/TikTok). 
      Mỗi gợi ý phải chỉ rõ cách tối ưu riêng cho từng nền tảng đã chọn.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              videoHooks: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              targetAudience: { type: Type.STRING },
              scriptSummary: { type: Type.STRING },
              platformCustomization: {
                type: Type.OBJECT,
                properties: {
                  tiktok: { type: Type.STRING },
                  facebook: { type: Type.STRING },
                  youtube: { type: Type.STRING }
                }
              }
            },
            required: ["productName", "reasoning", "videoHooks", "targetAudience", "scriptSummary", "platformCustomization"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  }
}

export const geminiService = new GeminiService();
