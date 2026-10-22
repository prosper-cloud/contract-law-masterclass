import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { saveStudyState } from "@/lib/progress.functions";
import { snapshot, useStudy, type Objective } from "@/lib/store";
import type { Level } from "@/content/types";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

const GOALS: { id: Objective; label: string }[] = [
  { id: "scratch", label: "Understand from scratch" },
  { id: "exams", label: "Examinations" },
  { id: "notes", label: "Lecture notes" },
  { id: "cases", label: "Case law" },
  { id: "problems", label: "Problem questions" },
  { id: "essays", label: "Essays" },
  { id: "assessment", label: "Continuous assessment" },
];

function ProfilePage() {
  const { user, isPending } = useCurrentUserState();
  const profile = useStudy();
  const initial = (profile.displayName || "B").slice(0, 1).toUpperCase();

  return (
    <Shell>
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-navy text-xl text-gold">{user?.profileImageUrl ? <img src={user.profileImageUrl} alt="" className="size-16 rounded-full object-cover" /> : initial}</span>
          <div>
            <h1 className="font-serif text-3xl">{profile.displayName}</h1>
            <p className="text-sm text-muted">{profile.syncLabel}</p>
          </div>
        </div>
        <label className="block text-sm">Display name
          <input value={profile.displayName} onChange={(e) => profile.setProfile({ displayName: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
        </label>
        <label className="block text-sm">Level
          <select value={profile.level} onChange={(e) => profile.setProfile({ level: e.target.value as Level })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
            <option value="beginner">Beginner / 100 level</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced / exams</option>
          </select>
        </label>
        <fieldset>
          <legend className="text-sm">Objectives</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GOALS.map((goal) => {
              const on = profile.objectives.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    profile.setProfile({
                      objectives: on ? profile.objectives.filter((id) => id !== goal.id) : [...profile.objectives, goal.id],
                    })
                  }
                  className={`min-h-10 rounded-full border px-3 text-sm ${on ? "border-emerald bg-emerald text-paper" : "border-line"}`}
                >
                  {goal.label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">Theme
            <select value={profile.theme} onChange={(e) => profile.setProfile({ theme: e.target.value as "light" | "dark" })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="text-sm">Text size
            <select value={profile.fontScale} onChange={(e) => profile.setProfile({ fontScale: e.target.value as "md" | "lg" | "xl" })} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-2">
              <option value="md">Standard</option>
              <option value="lg">Large</option>
              <option value="xl">Larger</option>
            </select>
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={profile.reduceMotion} onChange={(e) => profile.setProfile({ reduceMotion: e.target.checked })} /> Reduce motion
        </label>
        <section className="rounded-2xl border border-line bg-card p-4 text-sm">
          <h2 className="font-semibold">Account</h2>
          {isPending ? <p className="mt-2 text-muted">Checking your session…</p> : null}
          <SignedOut>
            <p className="mt-2 text-muted">You are studying on this device only. Sign in if you want the same record on another browser.</p>
            <Link to="/login" className="mt-3 inline-flex h-11 items-center rounded-xl bg-navy px-4 text-paper">Sign in</Link>
          </SignedOut>
          <SignedIn>
            <p className="mt-2 text-muted">{user?.primaryEmail || user?.displayName || "Signed in"} · progress syncs to your account. Uploaded files stay on this device.</p>
            <button
              type="button"
              className="mt-3 h-11 rounded-xl border border-line px-4"
              onClick={() => {
                saveStudyState({ data: { payload: snapshot() } })
                  .then(() => profile.setSyncLabel("Synced to your account"))
                  .catch(() => profile.setSyncLabel("Saved on this device — sync failed"));
              }}
            >
              Sync now
            </button>
          </SignedIn>
        </section>
      </div>
    </Shell>
  );
}
