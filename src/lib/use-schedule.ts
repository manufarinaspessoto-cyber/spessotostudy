import * as React from 'react'

import { initialSchedule, type StudySession } from '@/lib/fixtures'

const KEY = 'manustudy:schedule:v1'

/**
 * Estado do cronograma. Por enquanto fica no localStorage do navegador;
 * no marco de dados (PLAN.md) passa a vir do Netlify Database.
 */
export function useSchedule() {
  const [sessions, setSessions] = React.useState<StudySession[]>(initialSchedule)
  const loaded = React.useRef(false)

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) setSessions(JSON.parse(raw) as StudySession[])
    } catch {
      /* ignora dados corrompidos */
    }
    loaded.current = true
  }, [])

  React.useEffect(() => {
    if (!loaded.current) return
    window.localStorage.setItem(KEY, JSON.stringify(sessions))
  }, [sessions])

  const toggle = (id: string) =>
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    )
  const add = (s: Omit<StudySession, 'id' | 'done'>) =>
    setSessions((prev) => [
      ...prev,
      { ...s, id: `s-${Date.now()}`, done: false },
    ])
  const remove = (id: string) =>
    setSessions((prev) => prev.filter((s) => s.id !== id))
  const reset = () => setSessions(initialSchedule)

  return { sessions, toggle, add, remove, reset }
}

export const formatDuration = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? ` ${min % 60}min` : ''}` : `${min}min`
