import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpenText,
  CalendarHeart,
  ClipboardList,
  Layers,
  Lightbulb,
  Sparkles,
} from 'lucide-react'

import { Logo } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

const tools = [
  {
    icon: BookOpenText,
    title: 'Resumos',
    text: 'Cole um texto ou suas anotações e receba os pontos-chave organizados.',
    to: '/resumos' as const,
  },
  {
    icon: Lightbulb,
    title: 'Explicações de matérias',
    text: 'Peça para explicar qualquer conteúdo do jeito mais simples, com exemplos.',
  },
  {
    icon: ClipboardList,
    title: 'Simulados interativos',
    text: 'Responda questões, veja a correção na hora e entenda cada alternativa.',
    to: '/simulados' as const,
  },
  {
    icon: Layers,
    title: 'Flashcards',
    text: 'Baralhos por matéria com cartas que viram, para revisar em minutos.',
    to: '/flashcards' as const,
  },
  {
    icon: CalendarHeart,
    title: 'Cronograma de estudos',
    text: 'Monte sua semana, marque sessões concluídas e acompanhe sua meta.',
    to: '/cronograma' as const,
  },
  {
    icon: Sparkles,
    title: 'Integração com Google Forms',
    text: 'Transforme um conteúdo em questionário no Google Forms automaticamente.',
  },
]

function Home() {
  return (
    <div className="min-h-screen bg-blush">
      <header className="mx-auto flex max-w-content items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <Button asChild>
          <Link to="/painel">
            Entrar no app <ArrowRight />
          </Link>
        </Button>
      </header>

      <main>
        <section className="mx-auto grid max-w-content items-center gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
          <div>
            <Badge variant="secondary" className="mb-6 rounded-full px-3 py-1">
              ✨ Seu cantinho de estudos
            </Badge>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Manu’study:{' '}
              <em className="font-medium text-primary">estudar</em> ficou mais
              leve.
            </h1>
            <p className="mt-6 max-w-reading text-lg text-muted-foreground">
              Resumos, explicações de matérias, simulados interativos,
              flashcards e cronogramas — tudo reunido em um só lugar, com a sua
              cara.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-7 shadow-lg shadow-primary/30">
                <Link to="/painel">
                  Começar a estudar <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7">
                <Link to="/flashcards">Ver flashcards</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                ['6', 'ferramentas'],
                ['5', 'matérias'],
                ['12', 'dias seguidos'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-semibold text-primary">
                    {n}
                  </dd>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-0 rotate-3 rounded-[2.5rem] bg-primary/15" aria-hidden />
            <img
              src="/.netlify/images?url=/img/hero-desk.png&w=900&fm=webp"
              srcSet="/.netlify/images?url=/img/hero-desk.png&w=600&fm=webp 600w, /.netlify/images?url=/img/hero-desk.png&w=900&fm=webp 900w, /.netlify/images?url=/img/hero-desk.png&w=1200&fm=webp 1200w"
              sizes="(min-width: 1024px) 560px, 100vw"
              width={1024}
              height={1024}
              alt="Mesa de estudos em tons de rosa com cadernos, livros e flashcards"
              className="relative aspect-square w-full rounded-[2rem] object-cover shadow-2xl shadow-primary/20"
            />
            <div className="absolute -bottom-6 -left-4 rounded-2xl border bg-card p-4 shadow-xl sm:-left-8">
              <p className="text-xs text-muted-foreground">Simulado de Citologia</p>
              <p className="font-display text-2xl font-semibold">
                80% <span className="text-base text-primary">de acerto</span>
              </p>
            </div>
          </div>
        </section>

        <section className="paper-grid border-y border-border/70 bg-card/60 py-20">
          <div className="mx-auto max-w-content px-4 sm:px-6">
            <h2 className="font-display text-4xl font-semibold">
              Todas as ferramentas que você precisa
            </h2>
            <p className="mt-3 max-w-reading text-muted-foreground">
              Do primeiro contato com a matéria até a revisão da véspera da
              prova.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const Icon = tool.icon
                const inner = (
                  <>
                    <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 flex items-center gap-2 text-lg font-semibold">
                      {tool.title}
                      {!tool.to && (
                        <Badge variant="outline" className="text-[10px]">
                          em breve
                        </Badge>
                      )}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.text}
                    </p>
                  </>
                )
                const cls =
                  'group rounded-3xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none'
                return tool.to ? (
                  <Link key={tool.title} to={tool.to} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <div key={tool.title} className={cls}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-fuchsia-500 px-8 py-14 text-primary-foreground sm:px-14">
            <div className="absolute -right-10 -top-10 size-56 rounded-full bg-white/10" aria-hidden />
            <div className="absolute -bottom-16 right-24 size-40 rounded-full bg-white/10" aria-hidden />
            <h2 className="relative font-display text-4xl font-semibold sm:text-5xl">
              Bora estudar hoje?
            </h2>
            <p className="relative mt-3 max-w-reading opacity-90">
              Seu cronograma da semana já está te esperando, com flashcards e
              um simulado novinho.
            </p>
            <Button asChild size="lg" variant="secondary" className="relative mt-8 h-12 rounded-full px-7">
              <Link to="/painel">
                Abrir meu painel <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 py-8 text-center text-sm text-muted-foreground">
        Feito com 💗 para estudar melhor · Manu’study
      </footer>
    </div>
  )
}
