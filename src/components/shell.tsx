import { Link, useRouterState } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  CalendarDays,
  CircleUser,
  FolderOpen,
  Layers,
  ListChecks,
  Menu,
  MessagesSquare,
  PanelLeftClose,
  PanelLeftOpen,
  PenLine,
  Scale,
  Search,
  ShieldCheck,
  WifiOff,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { searchAll } from "@/content/search";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/cn";
import { useStudy } from "@/lib/store";
import { AccountSync } from "@/components/account-sync";

const NAV = [
  { to: "/", label: "Home", icon: BookOpen, exact: true },
  { to: "/learn", label: "Learn", icon: BookMarked },
  { to: "/tutor", label: "AI Tutor", icon: MessagesSquare },
  { to: "/cases", label: "Cases", icon: Scale },
  { to: "/flashcards", label: "Flashcards", icon: Layers },
  { to: "/quizzes", label: "Quizzes", icon: ListChecks },
  { to: "/irac", label: "IRAC Lab", icon: PenLine },
  { to: "/glossary", label: "Glossary", icon: BookOpen },
  { to: "/notes", label: "Notes", icon: PenLine },
  { to: "/documents", label: "Documents", icon: FolderOpen },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/sources", label: "Sources", icon: ShieldCheck },
  { to: "/profile", label: "Profile", icon: CircleUser },
] as const;

export function Shell({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [online, setOnline] = useState(true);
  const name = useStudy((s) => s.displayName);
  const hits = useMemo(() => searchAll(query), [query]);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [path]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <AccountSync />
      {!bare && (
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 hidden flex-col bg-sidebar text-sidebar-fg md:flex",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <Brand collapsed={collapsed} />
          <nav aria-label="Study sections" className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} collapsed={collapsed} active={isActive(path, item.to, item.exact)} />
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="m-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 text-sm text-sidebar-fg/80 hover:bg-white/10"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </aside>
      )}

      <div className={cn(!bare && (collapsed ? "md:pl-16" : "md:pl-64"))}>
        <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
          <div className="flex items-center gap-2 px-4 py-3">
            {!bare && (
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-line md:hidden"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="size-5" />
              </button>
            )}
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, cases, glossary"
                aria-label="Search the course"
                className="h-11 w-full rounded-xl border border-line bg-card pl-10 pr-3 text-sm outline-none"
              />
              {query && (
                <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-xl border border-line bg-card shadow-sm">
                  {hits.length === 0 ? (
                    <p className="px-3 py-3 text-sm text-muted">No matches in the course library.</p>
                  ) : (
                    hits.map((hit) => (
                      <AppLink key={hit.href + hit.title} to={hit.href} className="block px-3 py-3 hover:bg-tint">
                        <span className="text-xs uppercase tracking-wide text-gold-ink">{hit.kind}</span>
                        <span className="block text-sm font-medium">{hit.title}</span>
                        <span className="block truncate text-sm text-muted">{hit.snippet}</span>
                      </AppLink>
                    ))
                  )}
                </div>
              )}
            </div>
            <AuthSlot />
            <span className="hidden text-sm text-muted sm:inline">{name}</span>
          </div>
          {!online && (
            <p className="flex items-center gap-2 border-t border-line bg-tint px-4 py-2 text-sm">
              <WifiOff className="size-4" />
              You are offline. Saved lessons, notes, and flashcards still work. The live tutor needs a connection.
            </p>
          )}
        </header>
        <main id="main" className="px-4 py-6 pb-24 md:pb-10">
          {children}
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-navy/50" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar text-sidebar-fg" role="dialog" aria-label="Menu">
            <div className="flex items-center justify-between">
              <Brand collapsed={false} />
              <button type="button" className="mr-2 inline-flex size-11 items-center justify-center" aria-label="Close" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-2">
              {NAV.map((item) => (
                <NavLink key={item.to} {...item} collapsed={false} active={isActive(path, item.to, item.exact)} />
              ))}
            </nav>
          </div>
        </div>
      )}

      {!bare && (
        <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-card md:hidden">
          <Tab to="/" label="Home" icon={BookOpen} active={path === "/"} />
          <Tab to="/learn" label="Learn" icon={BookMarked} active={path.startsWith("/learn")} />
          <Tab to="/tutor" label="Tutor" icon={MessagesSquare} active={path.startsWith("/tutor")} />
          <Tab to="/flashcards" label="Cards" icon={Layers} active={path.startsWith("/flashcards")} />
          <button type="button" onClick={() => setOpen(true)} className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs text-muted">
            <Menu className="size-5" />
            More
          </button>
        </nav>
      )}
    </div>
  );
}

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 px-3 py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold font-semibold text-navy">CL</span>
      {!collapsed && (
        <span>
          <span className="block text-sm font-semibold leading-tight">Contract Law</span>
          <span className="block text-xs text-gold">Masterclass</span>
        </span>
      )}
    </Link>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  collapsed,
  active,
}: {
  to: string;
  label: string;
  icon: typeof BookOpen;
  collapsed: boolean;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      title={label}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm",
        active ? "bg-white/10 text-gold" : "text-sidebar-fg/80 hover:bg-white/5",
      )}
    >
      <Icon className="size-5 shrink-0" />
      {!collapsed && label}
    </Link>
  );
}

function Tab({ to, label, icon: Icon, active }: { to: string; label: string; icon: typeof BookOpen; active: boolean }) {
  return (
    <Link to={to} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs", active ? "text-gold-ink" : "text-muted")}>
      <Icon className="size-5" />
      {label}
    </Link>
  );
}

function AuthSlot() {
  const { isPending, user } = useCurrentUserState();
  if (isPending) return <span className="inline-block size-9 animate-pulse rounded-full bg-line" aria-hidden />;
  if (user) {
    return (
      <SignedIn>
        <UserButton />
      </SignedIn>
    );
  }
  return (
    <SignedOut>
      <Link to="/login" className="inline-flex h-11 items-center rounded-xl bg-navy px-3 text-sm font-medium text-paper">
        Sign in
      </Link>
    </SignedOut>
  );
}

function isActive(path: string, to: string, exact?: boolean) {
  if (exact || to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}
