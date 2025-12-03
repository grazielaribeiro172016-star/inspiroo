
import { CommunitySpark } from './types';

export const MOCK_COMMUNITY_SPARKS: CommunitySpark[] = [
  {
    id: '1',
    author: 'Cassiano',
    concept: 'Ajuda Rápida: Uber dos reparos domésticos de 5–20 min.',
    fullDescription: 'Profissionais próximos aceitam tarefas rápidas (trocar lâmpada, ajustar porta) imediatamente. Preço fixo e claro.',
    tags: ['Serviços', 'On-Demand', 'Casa'],
    likes: 342,
    likedByCurrentUser: false
  },
  {
    id: '2',
    author: 'Graziele',
    concept: 'Troca de Cuidados de Pets — Pet Sitting P2P baseado em créditos.',
    fullDescription: 'Rede de vizinhos cuidando dos pets uns dos outros. Você cuida 1 noite -> ganha crédito para usar depois. Sem dinheiro envolvido.',
    tags: ['Pets', 'Colaborativo', 'Comunidade'],
    likes: 215,
    likedByCurrentUser: false
  },
  {
    id: '3',
    author: 'Laura',
    concept: 'Pais Revezam: Ajuda entre pais do bairro para folgas de 1-2h.',
    fullDescription: 'Rede local de pais que trocam ajuda entre si para resolver coisas rápidas. Você cuida 1 hora -> ganha crédito.',
    tags: ['Família', 'Social', 'Rede de Apoio'],
    likes: 567,
    likedByCurrentUser: false
  },
  {
    id: '4',
    author: 'Sinval e Giovani',
    concept: 'Microajudas de Bairro: A plataforma de favores reais.',
    fullDescription: 'Plataforma para ajudas hiperlocais: segurar escada, acompanhar no hospital, levar um item. Recompensas simbólicas.',
    tags: ['Hiperlocal', 'Social', 'Conexão'],
    likes: 189,
    likedByCurrentUser: false
  },
  {
    id: '5',
    author: 'Grupo Plano B',
    concept: 'Incubadora de "Side Hustles": Valide seu Plano B sem pedir demissão.',
    fullDescription: 'Uma aceleradora focada exclusivamente em projetos noturnos e de fim de semana. Teste sua ideia de negócio em 30 dias antes de largar a segurança da CLT.',
    tags: ['Carreira', 'Segurança', 'Transição'],
    likes: 412,
    likedByCurrentUser: false
  }
];

export const INSPIRATION_PROMPTS = [
  "Rede social para idosos ensinarem a Geração Z...",
  "App para encontrar companhia para shows...",
  "Roupas que crescem junto com a criança...",
  "Marketplace de sobras de material de construção...",
  "Uber para passear com idosos..."
];

export const NEXT_STEPS_LIST = [
  "Pitch Deck",
  "MVP (Produto Mínimo)",
  "Personas",
  "Jornada do Usuário",
  "Nome Definitivo",
  "Tela Inicial do App",
  "Roadmap 90 dias",
  "Estratégia Viral"
];

export const AVATAR_STYLES = [
  { id: 'avataaars', name: 'Cartoon' },
  { id: 'notionists', name: 'Minimal' },
  { id: 'bottts', name: 'Robô' },
  { id: 'lorelei', name: 'Artístico' }
];

export const SPIRIT_PARTNERS = [
  { 
    id: 'ant', 
    label: 'Formiga 🐜', 
    description: 'Trabalho de formiguinha. Construção sólida, passo a passo.',
    stats: { creativity: 60, vision: 70, execution: 99 } 
  },
  { 
    id: 'dog', 
    label: 'Cachorro 🐕', 
    description: 'Lealdade e Conexão. O amigo que une a matilha.',
    stats: { creativity: 75, vision: 60, execution: 90 } 
  },
  { 
    id: 'cat', 
    label: 'Gato 🐈', 
    description: 'Inteligência independente. Curioso e ágil.',
    stats: { creativity: 95, vision: 80, execution: 60 } 
  },
  { 
    id: 'eagle', 
    label: 'Águia 🦅', 
    description: 'Visão de longo alcance. Vê oportunidades onde ninguém vê.',
    stats: { creativity: 85, vision: 99, execution: 70 } 
  },
  { 
    id: 'rabbit', 
    label: 'Coelho 🐇', 
    description: 'Velocidade pura. Salto de fé e execução rápida.',
    stats: { creativity: 80, vision: 60, execution: 95 } 
  },
  { 
    id: 'owl', 
    label: 'Coruja 🦉', 
    description: 'Sabedoria estratégica. Analisa tudo antes de agir.',
    stats: { creativity: 90, vision: 95, execution: 50 } 
  },
  { 
    id: 'lion', 
    label: 'Leão 🦁', 
    description: 'Liderança natural. Coragem para guiar o bando.',
    stats: { creativity: 70, vision: 90, execution: 90 } 
  }
];

// Mantendo compatibilidade caso algo use USER_ROLES antigo, mas mapeando para os novos
export const USER_ROLES = SPIRIT_PARTNERS;
