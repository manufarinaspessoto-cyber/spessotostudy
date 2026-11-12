import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, ChevronLeft, Clock, RotateCcw, Sparkles, XCircle } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { AppShell } from '@/components/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { quizzes, recentQuizResults, subjectById, type Quiz } from '@/lib/fixtures'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/simulados')({
  head: () => ({ meta: [{ title: "Simulados · Manu'study" }] }),
  component: SimuladosPage,
})

const letters = ['A', 'B', 'C', 'D', 'E']

function SimuladosPage() {
  const [quiz, setQuiz] = React.useState<Quiz | null>(null)
  if (quiz) return <TakeQuiz key={quiz.id} quiz={quiz} onBack={() => setQuiz(null)} />

  return (
    <AppShell
      title="Simulados"
      subtitle="Responda no seu ritmo: a correção e a explicação aparecem logo após cada questão."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {quizzes.map((q) => {
          const subject = subjectById(q.subject)
          const last = recentQuizResults.find((r) => r.quizId === q.id)
          return (
            <article key={q.id} className="flex flex-col rounded-3xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', subject.tone)}>
                  {subject.emoji} {subject.name}
                </span>
                <Badge variant="outline">{q.difficulty}</Badge>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold">{q.title}</h2>
              <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{q.questions.length} questões</span>·
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {q.durationMin} min</span>
              </p>
              {last && (
                <p className="mt-3 text-sm">
                  Última nota: <strong className="text-primary">{last.score}%</strong>{' '}
                  <span className="text-muted-foreground">({last.date})</span>
                </p>
              )}
              <div className="mt-auto flex gap-2 pt-6">
                <Button className="flex-1 rounded-full" onClick={() => setQuiz(q)}>
                  Começar <ArrowRight />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Exportar para o Google Forms"
                  title="Exportar para o Google Forms"
                  onClick={() => toast('Exportação para o Google Forms chega em breve ✨')}
                >
                  <Sparkles />
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </AppShell>
  )
}

function TakeQuiz({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [index, setIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<number | null>(null)
  const [confirmed, setConfirmed] = React.useState(false)
  const [answers, setAnswers] = React.useState<number[]>([])

  const total = quiz.questions.length
  const finished = answers.length === total && !confirmed
  const q = quiz.questions[index]
  const subject = subjectById(quiz.subject)

  const confirm = () => {
    if (selected === null) return
    setConfirmed(true)
    setAnswers((a) => [...a, selected])
  }
  const next = () => {
    setConfirmed(false)
    setSelected(null)
    if (index < total - 1) setIndex((i) => i + 1)
  }
  const restart = () => {
    setIndex(0)
    setSelected(null)
    setConfirmed(false)
    setAnswers([])
  }

  const correctCount = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length
  const score = Math.round((correctCount / total) * 100)

  return (
    <AppShell
      title={quiz.title}
      subtitle={`${subject.emoji} ${subject.name} · ${quiz.difficulty} · ${total} questões`}
      actions={
        <Button variant="outline" className="rounded-full" onClick={onBack}>
          <ChevronLeft /> Simulados
        </Button>
      }
    >
      <div className="mx-auto max-w-3xl">
        {finished ? (
          <div className="rounded-[2rem] border bg-card p-8 shadow-lg sm:p-10">
            <div className="text-center">
              <div
                className="mx-auto grid size-36 place-items-center rounded-full"
                style={{ background: `conic-gradient(var(--primary) ${score * 3.6}deg, var(--muted) 0)` }}
              >
                <div className="grid size-28 place-items-center rounded-full bg-card">
                  <span className="font-display text-4xl font-semibold">{score}%</span>
                </div>
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold">
                {score >= 80 ? 'Arrasou! 🎉' : score >= 50 ? 'Muito bem, continue! 💪' : 'Bora revisar juntas 🌸'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                Você acertou {correctCount} de {total} questões.
              </p>
            </div>
            <ol className="mt-8 flex flex-col gap-3">
              {quiz.questions.map((question, i) => {
                const ok = answers[i] === question.correctIndex
                return (
                  <li key={question.id} className="flex gap-3 rounded-2xl border p-4">
                    {ok ? <CheckCircle2 className="size-5 shrink-0 text-primary" /> : <XCircle className="size-5 shrink-0 text-destructive" />}
                    <div className="text-sm">
                      <p className="font-medium">{i + 1}. {question.statement}</p>
                      <p className="mt-1 text-muted-foreground">
                        Resposta: {letters[question.correctIndex]}) {question.options[question.correctIndex]}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button className="rounded-full" onClick={restart}><RotateCcw /> Refazer</Button>
              <Button variant="outline" className="rounded-full" onClick={onBack}>Outros simulados</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-4">
              <Progress value={(answers.length / total) * 100} className="h-2.5" />
              <span className="shrink-0 text-sm text-muted-foreground">Questão {index + 1} de {total}</span>
            </div>

            <div className="rounded-[2rem] border bg-card p-6 shadow-lg sm:p-8">
              <h2 className="font-display text-2xl font-medium leading-snug">{q.statement}</h2>
              <div role="radiogroup" aria-label="Alternativas" className="mt-6 flex flex-col gap-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i
                  const isCorrect = confirmed && i === q.correctIndex
                  const isWrong = confirmed && isSelected && i !== q.correctIndex
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={confirmed}
                      onClick={() => setSelected(i)}
                      className={cn(
                        'flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors motion-reduce:transition-none',
                        !confirmed && 'hover:border-primary/40 hover:bg-accent/40',
                        isSelected && !confirmed && 'border-primary bg-accent/50',
                        isCorrect && 'border-primary bg-primary/10',
                        isWrong && 'border-destructive bg-destructive/10',
                        confirmed && !isCorrect && !isWrong && 'opacity-60',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold',
                          (isSelected || isCorrect) && 'border-primary bg-primary text-primary-foreground',
                          isWrong && 'border-destructive bg-destructive text-white',
                        )}
                      >
                        {letters[i]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isCorrect && <CheckCircle2 className="size-5 text-primary" />}
                      {isWrong && <XCircle className="size-5 text-destructive" />}
                    </button>
                  )
                })}
              </div>

              {confirmed && (
                <div className="mt-6 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground" role="status">
                  <p className="font-semibold">
                    {selected === q.correctIndex ? 'Correto! 🎉' : `A resposta certa é a ${letters[q.correctIndex]}.`}
                  </p>
                  <p className="mt-1">{q.explanation}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                {confirmed ? (
                  <Button className="rounded-full" onClick={next}>
                    {index < total - 1 ? 'Próxima questão' : 'Ver resultado'} <ArrowRight />
                  </Button>
                ) : (
                  <Button className="rounded-full" disabled={selected === null} onClick={confirm}>
                    Confirmar resposta
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
