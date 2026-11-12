import { createFileRoute } from '@tanstack/react-router'
import { Check, ChevronLeft, RotateCcw, Shuffle, X } from 'lucide-react'
import * as React from 'react'

import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { decks, subjectById, type Deck, type Flashcard } from '@/lib/fixtures'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/flashcards')({
  head: () => ({ meta: [{ title: "Flashcards · Manu'study" }] }),
  component: FlashcardsPage,
})

function FlashcardsPage() {
  const [deck, setDeck] = React.useState<Deck | null>(null)

  if (deck) return <StudyDeck deck={deck} onBack={() => setDeck(null)} />

  return (
    <AppShell
      title="Flashcards"
      subtitle="Escolha um baralho e revise: pense na resposta, vire a carta e diga se acertou."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {decks.map((d, i) => {
          const subject = subjectById(d.subject)
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setDeck(d)}
              className="group relative text-left"
            >
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 rounded-3xl border bg-card shadow-sm transition-transform motion-reduce:transition-none',
                  i % 2 ? 'rotate-3' : '-rotate-3',
                  'group-hover:rotate-6',
                )}
              />
              <span className="relative flex min-h-52 flex-col rounded-3xl border bg-card p-6 shadow-md transition-transform group-hover:-translate-y-1 motion-reduce:transition-none">
                <span className={cn('w-fit rounded-full px-2.5 py-1 text-xs font-medium', subject.tone)}>
                  {subject.emoji} {subject.name}
                </span>
                <span className="mt-4 font-display text-2xl font-semibold leading-tight">
                  {d.title}
                </span>
                <span className="mt-auto flex justify-between pt-6 text-sm text-muted-foreground">
                  <span>{d.cards.length} cartas</span>
                  <span>visto {d.lastStudied}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </AppShell>
  )
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function StudyDeck({ deck, onBack }: { deck: Deck; onBack: () => void }) {
  const [cards, setCards] = React.useState<Flashcard[]>(deck.cards)
  const [index, setIndex] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)
  const [right, setRight] = React.useState<string[]>([])
  const [wrong, setWrong] = React.useState<string[]>([])

  const finished = index >= cards.length
  const card = cards[index]
  const subject = subjectById(deck.subject)

  const restart = (list: Flashcard[]) => {
    setCards(list)
    setIndex(0)
    setFlipped(false)
    setRight([])
    setWrong([])
  }

  const answer = (ok: boolean) => {
    if (!card) return
    ;(ok ? setRight : setWrong)((prev) => [...prev, card.id])
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return
      if (e.key === ' ' || e.key === 'Enter') {
        if ((e.target as HTMLElement)?.tagName === 'BUTTON') return
        e.preventDefault()
        setFlipped((f) => !f)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <AppShell
      title={deck.title}
      subtitle={`${subject.emoji} ${subject.name} · ${cards.length} cartas`}
      actions={
        <>
          <Button variant="outline" className="rounded-full" onClick={onBack}>
            <ChevronLeft /> Baralhos
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => restart(shuffle(deck.cards))}>
            <Shuffle /> Embaralhar
          </Button>
        </>
      }
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <Progress value={(Math.min(index, cards.length) / cards.length) * 100} className="h-2.5" />
          <span className="shrink-0 text-sm text-muted-foreground">
            {Math.min(index + 1, cards.length)}/{cards.length}
          </span>
        </div>

        {finished ? (
          <div className="rounded-[2rem] border bg-card p-10 text-center shadow-lg">
            <p className="text-5xl">{wrong.length === 0 ? '🏆' : '🌸'}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Baralho concluído!</h2>
            <p className="mt-2 text-muted-foreground">
              Você acertou <strong className="text-primary">{right.length}</strong> de {cards.length} cartas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {wrong.length > 0 && (
                <Button
                  className="rounded-full"
                  onClick={() => restart(cards.filter((c) => wrong.includes(c.id)))}
                >
                  Revisar as {wrong.length} que errei
                </Button>
              )}
              <Button variant="outline" className="rounded-full" onClick={() => restart(deck.cards)}>
                <RotateCcw /> Recomeçar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flip-scene">
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? 'Mostrar pergunta' : 'Mostrar resposta'}
                className="flip-card relative block h-80 w-full rounded-[2rem] text-left sm:h-96"
                data-flipped={flipped}
              >
                <span className="flip-face paper-grid absolute inset-0 flex flex-col rounded-[2rem] border bg-card p-8 shadow-xl shadow-primary/10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Pergunta</span>
                  <span className="m-auto text-center font-display text-2xl font-medium leading-snug sm:text-3xl">
                    {card.front}
                  </span>
                  <span className="text-center text-xs text-muted-foreground">
                    Toque ou aperte espaço para virar
                  </span>
                </span>
                <span className="flip-face flip-back absolute inset-0 flex flex-col rounded-[2rem] bg-gradient-to-br from-primary to-fuchsia-500 p-8 text-primary-foreground shadow-xl shadow-primary/30">
                  <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Resposta</span>
                  <span className="m-auto text-center text-xl font-medium leading-relaxed sm:text-2xl">
                    {card.back}
                  </span>
                </span>
              </button>
            </div>

            <div className={cn('mt-8 grid grid-cols-2 gap-4 transition-opacity motion-reduce:transition-none', !flipped && 'pointer-events-none opacity-40')}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl text-base"
                disabled={!flipped}
                onClick={() => answer(false)}
              >
                <X /> Errei
              </Button>
              <Button
                size="lg"
                className="h-14 rounded-2xl text-base"
                disabled={!flipped}
                onClick={() => answer(true)}
              >
                <Check /> Acertei
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              ✅ {right.length} acertos · ❌ {wrong.length} erros
            </p>
          </>
        )}
      </div>
    </AppShell>
  )
}
