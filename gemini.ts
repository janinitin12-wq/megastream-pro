
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVideoInfo = async (url: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract or guess a creative video title and a short description for this URL: ${url}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    });

    const json = JSON.parse(response.text);
    return json;
  } catch (error) {
    console.error("Gemini info extraction failed:", error);
    return {
      title: "Streaming Cloud Video",
      description: "Enjoy your content from Mega.io seamlessly."
    };
  }
};
