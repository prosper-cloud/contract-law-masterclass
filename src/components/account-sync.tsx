import { useEffect } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadStudyState, saveStudyState } from "@/lib/progress.functions";
import { applySnapshot, snapshot, useStudy } from "@/lib/store";

export function AccountSync() {
  const { user } = useCurrentUserState();
  const userId = user?.id;

  useEffect(() => {
    if (!userId || user?.isDevFallback) return;
    let cancelled = false;
    loadStudyState()
      .then(async (remote) => {
        if (cancelled) return;
        const localUpdated = useStudy.getState().updatedAt;
        if (!remote.payload) {
          if (localUpdated > 0) {
            await saveStudyState({ data: { payload: snapshot() } });
            useStudy.getState().setSyncLabel("Synced to your account");
          }
          return;
        }
        const remoteUpdated = Number((JSON.parse(remote.payload) as { updatedAt?: number }).updatedAt ?? 0);
        if (remoteUpdated > localUpdated) applySnapshot(remote.payload);
        else if (localUpdated > 0) {
          await saveStudyState({ data: { payload: snapshot() } });
          useStudy.getState().setSyncLabel("Synced to your account");
        }
      })
      .catch(() => {
        useStudy.getState().setSyncLabel("Saved on this device — sign-in sync is unavailable");
      });
    return () => {
      cancelled = true;
    };
  }, [userId, user?.isDevFallback]);

  useEffect(() => {
    if (!userId || user?.isDevFallback) return;
    let timer = 0;
    const unsub = useStudy.subscribe((state, prev) => {
      if (state.updatedAt === prev.updatedAt || state.updatedAt === 0) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        saveStudyState({ data: { payload: snapshot() } })
          .then(() => useStudy.getState().setSyncLabel("Synced to your account"))
          .catch(() => useStudy.getState().setSyncLabel("Saved on this device — last sync failed"));
      }, 1200);
    });
    return () => {
      unsub();
      window.clearTimeout(timer);
    };
  }, [userId, user?.isDevFallback]);

  return null;
}
