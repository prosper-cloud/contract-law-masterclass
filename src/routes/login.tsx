import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const result =
        mode === "up"
          ? await authClient.signUp.email({ email, password, name: name || email })
          : await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || "That email or password was not accepted.");
        return;
      }
      await navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4 py-10 text-fg">
      <div className="w-full max-w-md rounded-2xl border border-line bg-card p-6">
        <p className="text-sm text-gold-ink">Contract Law Masterclass</p>
        <h1 className="mt-1 font-serif text-3xl">{mode === "in" ? "Sign in" : "Create an account"}</h1>
        <p className="mt-2 text-sm text-muted">
          Signed-in progress syncs to your account. You can study without an account; that record stays on this device.
        </p>
        {authEnabled ? (
          <>
            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              {mode === "up" && (
                <label className="block text-sm">
                  Name
                  <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-bg px-3" />
                </label>
              )}
              <label className="block text-sm">
                Email
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-bg px-3" />
              </label>
              <label className="block text-sm">
                Password
                <input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-bg px-3" />
              </label>
              {error && <p className="text-sm text-danger" role="alert">{error}</p>}
              <button disabled={pending} className="h-11 w-full rounded-xl bg-navy text-sm font-medium text-paper" type="submit">
                {pending ? "Please wait…" : mode === "in" ? "Sign in with email" : "Create account"}
              </button>
            </form>
            <button type="button" className="mt-3 text-sm text-emerald-ink" onClick={() => setMode(mode === "in" ? "up" : "in")}>
              {mode === "in" ? "Need an account? Create one" : "Already registered? Sign in"}
            </button>
            <div className="my-4 h-px bg-line" />
            <div className="space-y-2">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
                  className="h-11 w-full rounded-xl border border-line text-sm"
                >
                  Continue with {provider.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted">Sign-in is turned off in this build.</p>
        )}
        <Link to="/" className="mt-6 inline-flex text-sm text-muted">Continue on this device</Link>
      </div>
    </main>
  );
}
