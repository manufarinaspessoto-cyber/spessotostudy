import { createFileRoute } from '@tanstack/react-router'
import { BookOpenText, Copy, Loader2, Sparkles } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  mockGenerateSummary,
  subjectById,
  subjects,
  summaries as initialSummaries,
  type SubjectId,
  type Summary,
} from '@/lib/fixtures'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/resumos')({
  head: () => ({ meta: [{ title: "Resumos · Manu'study" }] }),
  component: ResumosPage,
})

const MIN_CHARS = 80

function ResumosPage() {
  const [text, setText] = React.useState('')
  const [subject, setSubject] = React.useState<SubjectId>('biologia')
  const [loading, setLoading] = React.useState(false)
  const [list, setList] = React.useState<Summary[]>(initialSummaries)
  const [activeId, setActiveId] = React.useState(initialSummaries[0]?.id)
  const active = list.find((s) => s.id === activeId)

  const generate = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim().length < MIN_CHARS) return
    setLoading(true)
    // Simulação: no marco de IA (PLAN.md) isso vira uma chamada ao servidor.
    window.setTimeout(() => {
      const summary = mockGenerateSummary(text, subject)
      setList((l) => [summary, ...l])
      setActiveId(summary.id)
      setText('')
      setLoading(false)
      toast.success('Resumo criado ✨')
    }, 900)
  }

  const copy = async (s: Summary) => {
    try {
      await navigator.clipboard.writeText(
        `${s.title}\n\n${s.keyPoints.map((p) => `• ${p}`).join('\n')}\n\n${s.body}`,
      )
      toast('Resumo copiado')
    } catch {
      toast.error('Não foi possível copiar')
    }
  }

  const remaining = Math.max(0, MIN_CHARS - text.trim().length)

  return (
    <AppShell
      title="Resumos"
      subtitle="Cole um trecho do livro, da apostila ou das suas anotações e transforme em pontos-chave."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <form onSubmit={generate} className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="grid gap-2">
              <Label htmlFor="source">Seu texto</Label>
              <Textarea
                id="source"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ex.: A fotossíntese é o processo pelo qual as plantas…"
                className="min-h-48 resize-y"
              />
              <p className="text-xs text-muted-foreground">
                {remaining > 0 ? `Mais ${remaining} caracteres para gerar` : `${text.trim().length} caracteres`}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="grid flex-1 gap-2">
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
              <Button type="submit" className="rounded-full" disabled={loading || remaining > 0}>
                {loading ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : <Sparkles />}
                {loading ? 'Resumindo…' : 'Gerar resumo'}
              </Button>
            </div>
          </form>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Meus resumos</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {list.map((s) => {
                const subj = subjectById(s.subject)
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(s.id)}
                      aria-current={s.id === activeId}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors hover:bg-accent/40 motion-reduce:transition-none',
                        s.id === activeId && 'border-primary/50 bg-accent/50',
                      )}
                    >
                      <span className="text-xl" aria-hidden>{subj.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{s.title}</span>
                        <span className="text-xs text-muted-foreground">{subj.name} · {s.createdAt}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        <article className="paper-grid rounded-[2rem] border bg-card p-6 shadow-lg sm:p-8 lg:sticky lg:top-8 lg:self-start">
          {loading ? (
            <div className="flex flex-col gap-3" aria-busy>
              <div className="h-8 w-2/3 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
              ))}
            </div>
          ) : active ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', subjectById(active.subject).tone)}>
                    {subjectById(active.subject).emoji} {subjectById(active.subject).name}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">{active.title}</h2>
                </div>
                <Button variant="outline" size="icon" aria-label="Copiar resumo" onClick={() => copy(active)}>
                  <Copy />
                </Button>
              </div>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">Pontos-chave</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {active.keyPoints.map((p) => (
                  <li key={p} className="flex gap-3 rounded-xl bg-secondary/70 p-3 text-sm text-secondary-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">Em poucas palavras</h3>
              <p className="mt-3 leading-relaxed">{active.body}</p>
            </>
          ) : (
            <div className="grid min-h-64 place-items-center text-center text-muted-foreground">
              <div>
                <BookOpenText className="mx-auto size-8 text-primary" />
                <p className="mt-3">Seu resumo aparece aqui.</p>
              </div>
            </div>
          )}
        </article>
      </div>
    </AppShell>
  )
}
