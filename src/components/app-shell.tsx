import { Link } from '@tanstack/react-router'
import {
  BookOpenText,
  CalendarHeart,
  ClipboardList,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Sparkles,
} from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { studentProfile } from '@/lib/fixtures'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2', className)}
      aria-label="Manu'study — início"
    >
      <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/30 transition-transform group-hover:-rotate-6 motion-reduce:transition-none">
        <GraduationCap className="size-5" />
      </span>
      <span className="font-display text-xl font-semibold">
        Manu<span className="text-primary">’</span>study
      </span>
    </Link>
  )
}

type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
} & (
  | { to: '/painel' | '/cronograma' | '/flashcards' | '/simulados' | '/resumos' }
  | { to?: undefined; soon: true }
)

export const navItems: NavItem[] = [
  { to: '/painel', label: 'Painel', icon: LayoutDashboard },
  { to: '/cronograma', label: 'Cronograma', icon: CalendarHeart },
  { to: '/flashcards', label: 'Flashcards', icon: Layers },
  { to: '/simulados', label: 'Simulados', icon: ClipboardList },
  { to: '/resumos', label: 'Resumos', icon: BookOpenText },
  { label: 'Explicações', icon: Lightbulb, soon: true },
  { label: 'Google Forms', icon: Sparkles, soon: true },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Ferramentas" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        if (!item.to) {
          return (
            <span
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground/80"
            >
              <Icon className="size-4" />
              {item.label}
              <Badge variant="secondary" className="ml-auto text-[10px]">
                em breve
              </Badge>
            </span>
          )
        }
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground motion-reduce:transition-none"
            activeProps={{
              className:
                'bg-card text-primary shadow-sm ring-1 ring-sidebar-border hover:bg-card hover:text-primary',
            }}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function StreakCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 p-4 text-primary-foreground shadow-lg shadow-primary/25">
      <p className="text-xs font-medium uppercase tracking-wider opacity-80">
        Sequência
      </p>
      <p className="font-display text-3xl font-semibold">
        {studentProfile.streakDays} dias 🔥
      </p>
      <p className="mt-1 text-xs opacity-90">
        Continue assim, {studentProfile.name}!
      </p>
    </div>
  )
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-blush">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col gap-8 border-r border-sidebar-border bg-sidebar/80 p-5 backdrop-blur lg:flex">
        <Logo />
        <NavList />
        <div className="mt-auto">
          <StreakCard />
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
          <Logo />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 gap-6 bg-sidebar p-5">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navegue entre as ferramentas de estudo
              </SheetDescription>
              <Logo />
              <NavList onNavigate={() => setOpen(false)} />
              <div className="mt-auto">
                <StreakCard />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:py-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 max-w-reading text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
