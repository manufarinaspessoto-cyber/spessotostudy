import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock,
  Flame,
  Layers,
  Target,
} from 'lucide-react'
import * as React from 'react'

import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  quizzes,
  recentQuizResults,
  sessionKindLabel,
  studentProfile,
  subjectById,
  subjects,
  weekDays,
  type WeekDay,
} from '@/lib/fixtures'
import { formatDuration, useSchedule } from '@/lib/use-schedule'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/painel')({
  head: () => ({ meta: [{ title: "Painel · Manu'study" }] }),
  component: Painel,
})

const jsDayToWeekDay: WeekDay[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

function useToday(): WeekDay {
  const [today, setToday] = React.useState<WeekDay>('seg')
  React.useEffect(() => {
    setToday(jsDayToWeekDay[new Date().getDay()])
  }, [])
  return today
}

function Painel() {
  const { sessions, toggle } = useSchedule()
  const today = useToday()
  const todayLabel = weekDays.find((d) => d.id === today)?.label ?? ''
  const todaySessions = sessions
    .filter((s) => s.day === today)
    .sort((a, b) => a.start.localeCompare(b.start))
  const doneMin = sessions.filter((s) => s.done).reduce((t, s) => t + s.durationMin, 0)
  const plannedMin = sessions.reduce((t, s) => t + s.durationMin, 0)
  const weekPct = plannedMin ? Math.round((doneMin / plannedMin) * 100) : 0

  const stats = [
    { icon: Clock, label: 'Estudado na semana', value: formatDuration(doneMin), hint: `de ${formatDuration(plannedMin)} planejadas` },
    { icon: Flame, label: 'Sequência', value: `${studentProfile.streakDays} dias`, hint: 'seu recorde é 21' },
    { icon: Layers, label: 'Cards revisados hoje', value: String(studentProfile.cardsReviewedToday), hint: 'meta diária: 50' },
    { icon: Target, label: 'Média nos simulados', value: `${studentProfile.averageQuizScore}%`, hint: 'últimos 30 dias' },
  ]

  return (
    <AppShell
      title={`Oi, ${studentProfile.name}! 💗`}
      subtitle="Aqui está o resumo da sua semana de estudos. Um passinho de cada vez."
      actions={
        <Button asChild className="rounded-full">
          <Link to="/simulados">
            Fazer um simulado <ArrowRight />
          </Link>
        </Button>
      }
    >
      <section aria-label="Indicadores" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, hint }) => (
          <div key={label} className="rounded-3xl border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 text-primary" /> {label}
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Hoje · {todayLabel}</h2>
              <p className="text-sm text-muted-foreground">
                Toque numa sessão para marcar como feita.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/cronograma">
                Semana completa <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-5 flex flex-col gap-3">
            {todaySessions.length === 0 && (
              <li className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                Nenhuma sessão hoje — dia de descanso! 🌸{' '}
                <Link to="/cronograma" className="font-medium text-primary underline-offset-4 hover:underline">
                  Planejar algo
                </Link>
              </li>
            )}
            {todaySessions.map((s) => {
              const subject = subjectById(s.subject)
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => toggle(s.id)}
                    aria-pressed={s.done}
                    className={cn(
                      'flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 motion-reduce:transition-none',
                      s.done && 'bg-muted/60',
                    )}
                  >
                    {s.done ? (
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="size-5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={cn('truncate font-medium', s.done && 'text-muted-foreground line-through')}>
                        {s.topic}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.start} · {formatDuration(s.durationMin)} · {sessionKindLabel[s.kind]}
                      </p>
                    </div>
                    <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', subject.tone)}>
                      {subject.emoji} {subject.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso da semana</span>
              <span className="font-medium">{weekPct}%</span>
            </div>
            <Progress value={weekPct} className="h-2.5" />
          </div>
        </section>

        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Matérias</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {subjects.map((s) => (
              <li key={s.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {s.emoji} {s.name}
                  </span>
                  <span className="text-muted-foreground">{s.progress}%</span>
                </div>
                <Progress value={s.progress} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="rounded-3xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Últimos simulados</h2>
          <ul className="mt-4 divide-y">
            {recentQuizResults.map((r) => {
              const quiz = quizzes.find((q) => q.id === r.quizId)!
              return (
                <li key={r.quizId} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-semibold',
                      r.score >= 80 ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {r.score}%
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-label="Atalhos" className="grid gap-4 sm:grid-cols-3">
          {[
            { to: '/flashcards' as const, icon: Layers, title: 'Revisar flashcards', text: '4 baralhos prontos' },
            { to: '/simulados' as const, icon: ClipboardList, title: 'Novo simulado', text: `${quizzes.length} disponíveis` },
            { to: '/resumos' as const, icon: BookOpenText, title: 'Criar resumo', text: 'Cole seu texto' },
          ].map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col justify-between rounded-3xl bg-gradient-to-br from-secondary to-accent p-5 transition-transform hover:-translate-y-1 motion-reduce:transition-none"
            >
              <Icon className="size-6 text-primary" />
              <div className="mt-8">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </AppShell>
  )
}
