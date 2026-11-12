import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, Circle, Plus, RotateCcw, Trash2 } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  sessionKindLabel,
  subjectById,
  subjects,
  weekDays,
  type SessionKind,
  type SubjectId,
  type WeekDay,
} from '@/lib/fixtures'
import { formatDuration, useSchedule } from '@/lib/use-schedule'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/cronograma')({
  head: () => ({ meta: [{ title: "Cronograma · Manu'study" }] }),
  component: Cronograma,
})

function Cronograma() {
  const { sessions, toggle, add, remove, reset } = useSchedule()
  const [open, setOpen] = React.useState(false)
  const totalMin = sessions.reduce((t, s) => t + s.durationMin, 0)
  const doneCount = sessions.filter((s) => s.done).length

  return (
    <AppShell
      title="Cronograma da semana"
      subtitle={`${sessions.length} sessões planejadas · ${formatDuration(totalMin)} no total · ${doneCount} concluídas`}
      actions={
        <>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              reset()
              toast('Cronograma restaurado para o modelo inicial')
            }}
          >
            <RotateCcw /> Restaurar
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus /> Nova sessão
              </Button>
            </DialogTrigger>
            <NewSessionDialog
              onSave={(s) => {
                add(s)
                setOpen(false)
                toast.success('Sessão adicionada ao cronograma 💗')
              }}
            />
          </Dialog>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {weekDays.map((day) => {
          const daySessions = sessions
            .filter((s) => s.day === day.id)
            .sort((a, b) => a.start.localeCompare(b.start))
          const dayMin = daySessions.reduce((t, s) => t + s.durationMin, 0)
          return (
            <section key={day.id} className="flex flex-col rounded-3xl border bg-card/90 p-4 shadow-sm">
              <header className="mb-3 flex items-baseline justify-between">
                <h2 className="font-display text-lg font-semibold">{day.label}</h2>
                <span className="text-xs text-muted-foreground">
                  {dayMin ? formatDuration(dayMin) : 'livre'}
                </span>
              </header>
              <ul className="flex flex-1 flex-col gap-2">
                {daySessions.length === 0 && (
                  <li className="grid flex-1 place-items-center rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground">
                    Descanso 🌷
                  </li>
                )}
                {daySessions.map((s) => {
                  const subject = subjectById(s.subject)
                  return (
                    <li
                      key={s.id}
                      className={cn(
                        'group rounded-2xl border p-3 transition-colors motion-reduce:transition-none',
                        s.done ? 'bg-muted/60' : 'bg-background hover:border-primary/40',
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => toggle(s.id)}
                          aria-pressed={s.done}
                          aria-label={s.done ? 'Marcar como pendente' : 'Marcar como concluída'}
                          className="mt-0.5 rounded-full"
                        >
                          {s.done ? (
                            <CheckCircle2 className="size-4 text-primary" />
                          ) : (
                            <Circle className="size-4 text-muted-foreground" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className={cn('text-sm font-medium leading-snug', s.done && 'text-muted-foreground line-through')}>
                            {s.topic}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {s.start} · {formatDuration(s.durationMin)}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', subject.tone)}>
                              {subject.emoji} {subject.name}
                            </span>
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                              {sessionKindLabel[s.kind]}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Remover ${s.topic}`}
                          className="opacity-60 group-hover:opacity-100"
                          onClick={() => remove(s.id)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </AppShell>
  )
}

function NewSessionDialog({
  onSave,
}: {
  onSave: (s: {
    day: WeekDay
    start: string
    durationMin: number
    subject: SubjectId
    topic: string
    kind: SessionKind
  }) => void
}) {
  const [day, setDay] = React.useState<WeekDay>('seg')
  const [subject, setSubject] = React.useState<SubjectId>('biologia')
  const [kind, setKind] = React.useState<SessionKind>('leitura')
  const [start, setStart] = React.useState('09:00')
  const [duration, setDuration] = React.useState('45')
  const [topic, setTopic] = React.useState('')
  const [error, setError] = React.useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const durationMin = Number(duration)
    if (!topic.trim()) return setError('Diga o que você vai estudar.')
    if (!Number.isFinite(durationMin) || durationMin < 5 || durationMin > 480)
      return setError('A duração deve ficar entre 5 e 480 minutos.')
    setError('')
    onSave({ day, start, durationMin, subject, topic: topic.trim(), kind })
    setTopic('')
  }

  return (
    <DialogContent>
      <form onSubmit={submit} className="grid gap-5">
        <DialogHeader>
          <DialogTitle>Nova sessão de estudo</DialogTitle>
          <DialogDescription>Adicione um bloco ao seu cronograma da semana.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="topic">Assunto</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex.: Leis de Newton"
            aria-invalid={!!error && !topic.trim()}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Dia</Label>
            <Select value={day} onValueChange={(v) => setDay(v as WeekDay)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {weekDays.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Matéria</Label>
            <Select value={subject} onValueChange={(v) => setSubject(v as SubjectId)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.emoji} {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start">Início</Label>
            <Input id="start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duração (min)</Label>
            <Input id="duration" type="number" min={5} max={480} step={5} value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Tipo de atividade</Label>
          <Select value={kind} onValueChange={(v) => setKind(v as SessionKind)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(sessionKindLabel) as SessionKind[]).map((k) => (
                <SelectItem key={k} value={k}>{sessionKindLabel[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        <DialogFooter>
          <Button type="submit" className="rounded-full">Adicionar sessão</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
