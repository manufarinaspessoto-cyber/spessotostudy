/**
 * Dados de exemplo (stubs) do Manu'study.
 *
 * Todas as telas leem daqui por enquanto. Nos próximos marcos (ver PLAN.md),
 * estas constantes serão substituídas por consultas ao Netlify Database e
 * por respostas geradas pela IA via Netlify AI Gateway.
 */

export type SubjectId =
  | 'biologia'
  | 'historia'
  | 'matematica'
  | 'quimica'
  | 'literatura'

export interface Subject {
  id: SubjectId
  name: string
  emoji: string
  /** Classe Tailwind para o “chip” colorido da matéria. */
  tone: string
  progress: number
}

export const subjects: Subject[] = [
  { id: 'biologia', name: 'Biologia', emoji: '🧬', tone: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200', progress: 72 },
  { id: 'historia', name: 'História', emoji: '🏛️', tone: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200', progress: 48 },
  { id: 'matematica', name: 'Matemática', emoji: '📐', tone: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-200', progress: 61 },
  { id: 'quimica', name: 'Química', emoji: '⚗️', tone: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200', progress: 35 },
  { id: 'literatura', name: 'Literatura', emoji: '📚', tone: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200', progress: 84 },
]

export const subjectById = (id: SubjectId) =>
  subjects.find((s) => s.id === id) ?? subjects[0]

export const studentProfile = {
  name: 'Manu',
  streakDays: 12,
  weeklyGoalHours: 15,
  weeklyDoneHours: 9.5,
  cardsReviewedToday: 38,
  averageQuizScore: 82,
}

/* ------------------------------------------------------------------ */
/* Cronograma                                                          */
/* ------------------------------------------------------------------ */

export type WeekDay = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'

export const weekDays: { id: WeekDay; label: string; short: string }[] = [
  { id: 'seg', label: 'Segunda', short: 'Seg' },
  { id: 'ter', label: 'Terça', short: 'Ter' },
  { id: 'qua', label: 'Quarta', short: 'Qua' },
  { id: 'qui', label: 'Quinta', short: 'Qui' },
  { id: 'sex', label: 'Sexta', short: 'Sex' },
  { id: 'sab', label: 'Sábado', short: 'Sáb' },
  { id: 'dom', label: 'Domingo', short: 'Dom' },
]

export type SessionKind = 'leitura' | 'flashcards' | 'simulado' | 'resumo' | 'revisao'

export const sessionKindLabel: Record<SessionKind, string> = {
  leitura: 'Leitura',
  flashcards: 'Flashcards',
  simulado: 'Simulado',
  resumo: 'Resumo',
  revisao: 'Revisão',
}

export interface StudySession {
  id: string
  day: WeekDay
  start: string
  durationMin: number
  subject: SubjectId
  topic: string
  kind: SessionKind
  done: boolean
}

export const initialSchedule: StudySession[] = [
  { id: 's1', day: 'seg', start: '08:00', durationMin: 60, subject: 'biologia', topic: 'Divisão celular: mitose e meiose', kind: 'leitura', done: true },
  { id: 's2', day: 'seg', start: '14:00', durationMin: 45, subject: 'matematica', topic: 'Funções do 2º grau', kind: 'simulado', done: true },
  { id: 's3', day: 'ter', start: '09:00', durationMin: 50, subject: 'historia', topic: 'Revolução Francesa', kind: 'resumo', done: true },
  { id: 's4', day: 'ter', start: '19:00', durationMin: 30, subject: 'biologia', topic: 'Organelas celulares', kind: 'flashcards', done: false },
  { id: 's5', day: 'qua', start: '08:30', durationMin: 90, subject: 'quimica', topic: 'Estequiometria', kind: 'leitura', done: false },
  { id: 's6', day: 'qua', start: '16:00', durationMin: 40, subject: 'literatura', topic: 'Modernismo brasileiro', kind: 'revisao', done: false },
  { id: 's7', day: 'qui', start: '10:00', durationMin: 60, subject: 'matematica', topic: 'Progressões aritméticas', kind: 'leitura', done: false },
  { id: 's8', day: 'qui', start: '20:00', durationMin: 30, subject: 'historia', topic: 'Era Vargas', kind: 'flashcards', done: false },
  { id: 's9', day: 'sex', start: '09:00', durationMin: 75, subject: 'biologia', topic: 'Simulado de citologia', kind: 'simulado', done: false },
  { id: 's10', day: 'sab', start: '10:00', durationMin: 120, subject: 'quimica', topic: 'Revisão geral da semana', kind: 'revisao', done: false },
]

/* ------------------------------------------------------------------ */
/* Flashcards                                                          */
/* ------------------------------------------------------------------ */

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Deck {
  id: string
  title: string
  subject: SubjectId
  cards: Flashcard[]
  lastStudied: string
}

export const decks: Deck[] = [
  {
    id: 'citologia',
    title: 'Citologia essencial',
    subject: 'biologia',
    lastStudied: 'hoje',
    cards: [
      { id: 'c1', front: 'Qual organela é responsável pela respiração celular?', back: 'A mitocôndria — ela produz ATP a partir da glicose e do oxigênio.' },
      { id: 'c2', front: 'O que é a membrana plasmática?', back: 'Uma bicamada lipídica com proteínas que controla a entrada e a saída de substâncias da célula (permeabilidade seletiva).' },
      { id: 'c3', front: 'Diferença entre mitose e meiose?', back: 'Mitose gera 2 células idênticas (2n). Meiose gera 4 células com metade dos cromossomos (n), formando gametas.' },
      { id: 'c4', front: 'Função do ribossomo?', back: 'Síntese de proteínas a partir das informações do RNA mensageiro.' },
      { id: 'c5', front: 'O que faz o complexo de Golgi?', back: 'Modifica, empacota e distribui proteínas e lipídios produzidos no retículo endoplasmático.' },
      { id: 'c6', front: 'Onde ocorre a fotossíntese?', back: 'Nos cloroplastos, presentes nas células vegetais e de algas.' },
    ],
  },
  {
    id: 'rev-francesa',
    title: 'Revolução Francesa',
    subject: 'historia',
    lastStudied: 'ontem',
    cards: [
      { id: 'h1', front: 'Em que ano ocorreu a Queda da Bastilha?', back: '14 de julho de 1789 — marco simbólico do início da Revolução.' },
      { id: 'h2', front: 'Qual era o lema da Revolução?', back: '“Liberdade, Igualdade, Fraternidade.”' },
      { id: 'h3', front: 'O que foi o Período do Terror?', back: 'Fase (1793–1794) liderada pelos jacobinos e Robespierre, marcada por execuções em massa.' },
      { id: 'h4', front: 'Quem chegou ao poder com o Golpe do 18 Brumário?', back: 'Napoleão Bonaparte, em 1799, encerrando a Revolução.' },
    ],
  },
  {
    id: 'funcoes',
    title: 'Funções e gráficos',
    subject: 'matematica',
    lastStudied: 'há 3 dias',
    cards: [
      { id: 'm1', front: 'Fórmula do vértice de uma parábola (x)?', back: 'xᵥ = −b / 2a' },
      { id: 'm2', front: 'O que o discriminante Δ indica?', back: 'Δ > 0: duas raízes reais. Δ = 0: uma raiz real. Δ < 0: nenhuma raiz real.' },
      { id: 'm3', front: 'Quando a parábola tem concavidade para cima?', back: 'Quando o coeficiente a é positivo (a > 0).' },
      { id: 'm4', front: 'Fórmula de Bhaskara?', back: 'x = (−b ± √Δ) / 2a, com Δ = b² − 4ac' },
      { id: 'm5', front: 'O que é o domínio de uma função?', back: 'O conjunto de todos os valores de entrada (x) para os quais a função está definida.' },
    ],
  },
  {
    id: 'modernismo',
    title: 'Modernismo brasileiro',
    subject: 'literatura',
    lastStudied: 'semana passada',
    cards: [
      { id: 'l1', front: 'Qual evento marcou o início do Modernismo no Brasil?', back: 'A Semana de Arte Moderna de 1922, em São Paulo.' },
      { id: 'l2', front: 'Autor de “Macunaíma”?', back: 'Mário de Andrade (1928).' },
      { id: 'l3', front: 'O que propunha o Manifesto Antropófago?', back: 'Oswald de Andrade propôs “devorar” a cultura estrangeira e transformá-la em algo genuinamente brasileiro.' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Simulados                                                           */
/* ------------------------------------------------------------------ */

export interface QuizQuestion {
  id: string
  statement: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  subject: SubjectId
  durationMin: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    id: 'citologia-1',
    title: 'Citologia — nível ENEM',
    subject: 'biologia',
    durationMin: 10,
    difficulty: 'Médio',
    questions: [
      {
        id: 'q1',
        statement: 'Qual organela celular é conhecida como a “usina de energia” da célula?',
        options: ['Ribossomo', 'Mitocôndria', 'Lisossomo', 'Complexo de Golgi'],
        correctIndex: 1,
        explanation: 'A mitocôndria realiza a respiração celular aeróbica, produzindo a maior parte do ATP da célula.',
      },
      {
        id: 'q2',
        statement: 'A meiose é um processo de divisão celular que resulta em:',
        options: [
          'Duas células diploides idênticas',
          'Quatro células diploides',
          'Quatro células haploides geneticamente diferentes',
          'Duas células haploides idênticas',
        ],
        correctIndex: 2,
        explanation: 'A meiose envolve duas divisões sucessivas e o crossing-over, gerando quatro células haploides (n) com variabilidade genética.',
      },
      {
        id: 'q3',
        statement: 'Qual estrutura está presente em células vegetais, mas ausente em células animais?',
        options: ['Membrana plasmática', 'Núcleo', 'Parede celular', 'Mitocôndria'],
        correctIndex: 2,
        explanation: 'A parede celular de celulose é exclusiva das células vegetais (entre os dois tipos), dando sustentação e forma.',
      },
      {
        id: 'q4',
        statement: 'A síntese de proteínas ocorre principalmente nos:',
        options: ['Lisossomos', 'Ribossomos', 'Centríolos', 'Vacúolos'],
        correctIndex: 1,
        explanation: 'Os ribossomos traduzem o RNA mensageiro em cadeias de aminoácidos, formando as proteínas.',
      },
      {
        id: 'q5',
        statement: 'O transporte de substâncias contra o gradiente de concentração, com gasto de energia, é chamado de:',
        options: ['Difusão simples', 'Osmose', 'Difusão facilitada', 'Transporte ativo'],
        correctIndex: 3,
        explanation: 'O transporte ativo usa ATP (como na bomba de sódio e potássio) para mover substâncias contra o gradiente.',
      },
    ],
  },
  {
    id: 'funcoes-1',
    title: 'Função quadrática',
    subject: 'matematica',
    durationMin: 15,
    difficulty: 'Difícil',
    questions: [
      {
        id: 'f1',
        statement: 'Qual é o x do vértice da função f(x) = x² − 6x + 5?',
        options: ['−3', '3', '5', '6'],
        correctIndex: 1,
        explanation: 'xᵥ = −b / 2a = −(−6) / (2·1) = 3.',
      },
      {
        id: 'f2',
        statement: 'Quantas raízes reais tem f(x) = x² + 2x + 5?',
        options: ['Nenhuma', 'Uma', 'Duas', 'Infinitas'],
        correctIndex: 0,
        explanation: 'Δ = 2² − 4·1·5 = −16. Como Δ < 0, não há raízes reais.',
      },
      {
        id: 'f3',
        statement: 'As raízes de f(x) = x² − 5x + 6 são:',
        options: ['1 e 6', '−2 e −3', '2 e 3', '−1 e 6'],
        correctIndex: 2,
        explanation: 'Soma = 5 e produto = 6, então as raízes são 2 e 3.',
      },
    ],
  },
  {
    id: 'rev-francesa-1',
    title: 'Revolução Francesa',
    subject: 'historia',
    durationMin: 8,
    difficulty: 'Fácil',
    questions: [
      {
        id: 'r1',
        statement: 'A Queda da Bastilha ocorreu em:',
        options: ['1776', '1789', '1799', '1815'],
        correctIndex: 1,
        explanation: 'Em 14 de julho de 1789, a população de Paris tomou a Bastilha, símbolo do absolutismo.',
      },
      {
        id: 'r2',
        statement: 'Quem liderou o período conhecido como “Terror”?',
        options: ['Napoleão Bonaparte', 'Luís XVI', 'Robespierre', 'Danton'],
        correctIndex: 2,
        explanation: 'Maximilien de Robespierre, líder jacobino, comandou o Comitê de Salvação Pública durante o Terror.',
      },
    ],
  },
]

export const recentQuizResults = [
  { quizId: 'citologia-1', score: 80, date: '10 nov' },
  { quizId: 'rev-francesa-1', score: 100, date: '8 nov' },
  { quizId: 'funcoes-1', score: 67, date: '5 nov' },
]

/* ------------------------------------------------------------------ */
/* Resumos                                                             */
/* ------------------------------------------------------------------ */

export interface Summary {
  id: string
  title: string
  subject: SubjectId
  createdAt: string
  keyPoints: string[]
  body: string
}

export const summaries: Summary[] = [
  {
    id: 'sum-1',
    title: 'Mitose x Meiose',
    subject: 'biologia',
    createdAt: '11 nov',
    keyPoints: [
      'Mitose: 1 divisão → 2 células-filhas idênticas (2n).',
      'Meiose: 2 divisões → 4 células haploides (n).',
      'Crossing-over na prófase I garante variabilidade genética.',
      'Mitose serve ao crescimento e reparo; meiose forma gametas.',
    ],
    body: 'A divisão celular permite que organismos cresçam, se reparem e se reproduzam. Na mitose, a célula duplica seu material genético e se divide uma vez, originando duas células iguais à original. Na meiose, ocorrem duas divisões consecutivas, reduzindo pela metade o número de cromossomos — essencial para a reprodução sexuada.',
  },
  {
    id: 'sum-2',
    title: 'Causas da Revolução Francesa',
    subject: 'historia',
    createdAt: '9 nov',
    keyPoints: [
      'Crise financeira do Estado francês.',
      'Sociedade dividida em três estados, com privilégios ao clero e à nobreza.',
      'Influência das ideias iluministas.',
      'Alta dos preços dos alimentos e fome.',
    ],
    body: 'No final do século XVIII, a França vivia uma profunda crise econômica e social. O Terceiro Estado, que sustentava o país com impostos, passou a exigir representação política. Inspirado pelo Iluminismo, o movimento derrubou o Antigo Regime.',
  },
]

/** Resumo “gerado” usado pela tela de Resumos enquanto a IA não está conectada. */
export function mockGenerateSummary(text: string, subject: SubjectId): Summary {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20)
  const keyPoints = (sentences.length ? sentences : [text.trim()])
    .slice(0, 4)
    .map((s) => (s.length > 140 ? `${s.slice(0, 137)}…` : s))
  const firstWords = text.trim().split(/\s+/).slice(0, 5).join(' ')
  return {
    id: `sum-${Date.now()}`,
    title: firstWords ? `Resumo: ${firstWords}…` : 'Novo resumo',
    subject,
    createdAt: 'agora',
    keyPoints,
    body: sentences.slice(0, 3).join(' ') || text.trim(),
  }
}
