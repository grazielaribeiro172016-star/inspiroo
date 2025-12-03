import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, AnalysisMode } from "../types";

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    spark_translation: { type: Type.STRING, description: "Interpretação da ideia: O que ela significa e qual dor toca. Texto fluido e inspirador." },
    structure: {
      type: Type.OBJECT,
      properties: {
        one_liner: { type: Type.STRING, description: "Resumo da ideia em 1 frase poderosa." },
        title: { type: Type.STRING, description: "Sugestão de nome para o projeto." },
        value_prop: { type: Type.STRING, description: "Proposta de valor resumida." },
        problem: { type: Type.STRING, description: "O problema real que resolve." },
        target_audience: { type: Type.STRING, description: "Quem ama essa ideia (Público alvo)." },
        why_now: { type: Type.STRING, description: "Por que isso faz sentido agora (Timing)." },
      },
      required: ["one_liner", "title", "value_prop", "problem", "target_audience", "why_now"]
    },
    creative_paths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 caminhos alternativos/variações criativas da ideia."
    },
    startup_evolution: {
      type: Type.OBJECT,
      properties: {
        pitch_30s: { type: Type.STRING, description: "Pitch de elevador (30 segundos)." },
        pitch_140_char: { type: Type.STRING, description: "Pitch para Twitter (140 caracteres)." },
        first_feature: { type: Type.STRING, description: "A primeira funcionalidade essencial (MVP)." },
        business_models: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "2 modelos de negócio possíveis."
        },
        validation_steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3 primeiros passos práticos para validar."
        }
      },
      required: ["pitch_30s", "pitch_140_char", "first_feature", "business_models", "validation_steps"]
    },
    smart_connections: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Sugestões de mercados, tendências ou conexões."
    },
    hook_message: { type: Type.STRING, description: "Uma frase curta e motivadora convidando a marcar os próximos passos." }
  },
  required: ["spark_translation", "structure", "creative_paths", "startup_evolution", "smart_connections", "hook_message"]
};

export const analyzeIdea = async (rawIdea: string, mode: AnalysisMode): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("A chave da API está faltando.");
  }

  let modeInstruction = "";
  
  switch (mode) {
    case AnalysisMode.PERSONAL:
      modeInstruction = `
      MODO: DESBLOQUEIO PESSOAL (CLAREZA MENTAL).
      FOCO: Ajude o usuário a entender a própria ideia. Tire o ruído. Simplifique ao extremo.
      ESTILO: Como um mentor criativo pessoal. Use metáforas visuais.
      Na 'startup_evolution', foque em passos pequenos e realizáveis hoje.
      `;
      break;
    case AnalysisMode.PARTNERS:
      modeInstruction = `
      MODO: ALINHAMENTO PARA SÓCIOS.
      FOCO: Visão de longo prazo, propósito compartilhado e potencial de impacto.
      ESTILO: Persuasivo, inspirador e visionário.
      Na 'startup_evolution', foque em escalabilidade e "Big Picture".
      `;
      break;
    case AnalysisMode.STARTUP:
      modeInstruction = `
      MODO: STARTUP E MERCADO.
      FOCO: Validação, dor do cliente, dinheiro e tração.
      ESTILO: Direto, estratégico e orientado a negócios (mas ainda humano).
      Na 'startup_evolution', foque em MVP, CAC, LTV (conceitual) e Monetização.
      `;
      break;
  }

  const SYSTEM_INSTRUCTION = `
  Você é o INSPIRØØ.
  Sua missão: Transformar ideias cruas em conceitos poderosos.

  ${modeInstruction}

  PRINCÍPIOS OBRIGATÓRIOS (ESTILO AUSTIN KLEON / RASCUNHO):
  1. Seja VISUAL na escrita: Use palavras que criam imagens.
  2. Seja BREVE e IMPACTANTE: Sem "textão". Frases de soco.
  3. Estilo "Manifesto": Fale com energia.
  4. Rápido e Devagar: Clareza imediata.
  
  Retorne APENAS um JSON válido seguindo o schema.
  `;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: rawIdea,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.7, 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("Nenhum texto retornado pelo Gemini.");
    }
  } catch (error) {
    console.error("Erro na Análise Gemini:", error);
    throw error;
  }
};