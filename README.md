# Manu'study

Aplicativo pessoal de estudos com identidade visual moderna em tons de rosa. Reúne
ferramentas para estudantes: resumos, explicações de matérias, simulados
interativos, flashcards, cronograma de estudos e (em breve) criação automática de
questionários no Google Forms.

## Telas

| Rota          | Tela                                                         |
| ------------- | ------------------------------------------------------------ |
| `/`           | Página inicial da marca                                      |
| `/painel`     | Painel com indicadores, sessões do dia e progresso           |
| `/cronograma` | Cronograma semanal (adicionar / concluir / remover sessões)  |
| `/flashcards` | Baralhos e modo de revisão com cartas que viram              |
| `/simulados`  | Simulados com correção e explicação imediata                 |
| `/resumos`    | Criação de resumos a partir de um texto (gerador simulado)   |

## Tecnologias

- TanStack Start + React 19 + TanStack Router (rotas por arquivo)
- Tailwind CSS 4 e componentes shadcn/ui (Radix)
- Fontes Fraunces (títulos) e Plus Jakarta Sans (texto)
- Netlify (deploy, Image CDN para a ilustração da home)

## Rodando localmente

```bash
pnpm install
netlify dev   # ou: pnpm dev
```

## Roadmap

Os dados atuais são de exemplo (`src/lib/fixtures.ts`). Os próximos passos —
banco de dados, login, IA para resumos/explicações, geração de flashcards e
simulados, repetição espaçada e integração com o Google Forms — estão
detalhados em [PLAN.md](PLAN.md).
