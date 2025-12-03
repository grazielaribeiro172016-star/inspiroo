export interface StartupEvolution {
  pitch_30s: string;
  pitch_140_char: string;
  first_feature: string;
  business_models: string[];
  validation_steps: string[];
}

export interface StructuredIdea {
  one_liner: string;
  title: string;
  value_prop: string;
  problem: string;
  target_audience: string;
  why_now: string;
}

export interface AnalysisResult {
  spark_translation: string; // "Tradução da Faísca"
  structure: StructuredIdea;
  creative_paths: string[]; // 3 Paths (A, B, C)
  startup_evolution: StartupEvolution;
  smart_connections: string[];
  hook_message: string; // Message before the checklist
}

export enum AnalysisMode {
  PERSONAL = 'PERSONAL', // Melhorar para mim (Clareza)
  PARTNERS = 'PARTNERS', // Compartilhar com sócios (Visão)
  STARTUP = 'STARTUP'    // Potencial de Startup (Mercado)
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
  level?: number;
  xp?: number;
  stats?: {
    creativity: number;
    vision: number;
    execution: number;
  }
}

export interface CommunitySpark {
  id: string;
  author: string;
  concept: string;
  fullDescription?: string;
  tags: string[];
  likes: number;
  likedByCurrentUser?: boolean;
}

export enum AppState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}