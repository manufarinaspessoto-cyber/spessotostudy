# Manu'study — Roadmap

Manu'study reúne ferramentas de estudo (resumos, explicações, simulados, flashcards,
cronograma e integração com o Google Forms) em um app pessoal com identidade rosa.
O produto foi organizado em marcos pequenos e independentes, começando pela
experiência visual e evoluindo para dados reais e IA.

## ✅ Marco 1 — Superfície do produto (concluído)

- Página inicial com a marca, ilustração e apresentação das ferramentas.
- Painel com indicadores, sessões do dia, progresso por matéria e atalhos.
- Cronograma semanal interativo (adicionar, concluir, remover sessões).
- Flashcards com baralhos por matéria, carta que vira e revisão dos erros.
- Simulados com correção imediata, explicação e tela de resultado.
- Resumos com gerador simulado (divide o texto em pontos-chave).
- Todos os dados de exemplo ficam em `src/lib/fixtures.ts`; o cronograma persiste
  no `localStorage` via `src/lib/use-schedule.ts`.

## Marco 2 — Modelo de dados e persistência

- Configurar Netlify Database (`@netlify/database` + Drizzle) com `db/schema.ts`.
- Tabelas: `subjects`, `study_sessions`, `decks`, `flashcards`, `card_reviews`,
  `quizzes`, `quiz_questions`, `quiz_attempts`, `summaries`.
- Server functions do TanStack Start para CRUD; substituir as importações de
  `fixtures.ts` por loaders. Seed inicial a partir dos fixtures.

## Marco 3 — Conta pessoal (login)

- Netlify Identity (`@netlify/identity`) para proteger os dados da estudante.
- Associar todas as tabelas a `user_id`; telas do app exigem login.

## Marco 4 — Resumos e explicações com IA

- Netlify AI Gateway (modelo de texto) em server functions.
- Resumos: substituir `mockGenerateSummary` por geração real (pontos-chave + texto).
- Nova tela **Explicações**: perguntar sobre uma matéria e receber uma explicação
  didática com exemplos, em streaming.

## Marco 5 — Geração automática de flashcards e simulados

- Gerar baralhos e simulados a partir de um resumo ou texto (saída JSON validada com Zod).
- Edição manual das cartas e questões geradas.

## Marco 6 — Repetição espaçada e estatísticas

- Agendamento das revisões (algoritmo tipo SM-2) com base em `card_reviews`.
- Indicadores reais no Painel (horas, sequência, média nos simulados).

## Marco 7 — Integração com o Google Forms

- OAuth do Google com escopo `forms.body`; tokens guardados no servidor.
- Exportar um simulado como questionário (Google Forms API: `forms.create` +
  `batchUpdate` com questões de múltipla escolha e gabarito em modo teste).
- Botão “Exportar para o Google Forms” (já presente nos cards de simulado) passa
  a funcionar; link do formulário salvo no simulado.

## Marco 8 — Acabamentos

- Modo escuro com alternância (as variáveis `.dark` já existem em `styles.css`).
- Lembretes do cronograma, PWA/instalação no celular.
