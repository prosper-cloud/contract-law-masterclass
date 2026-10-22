import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

export const loadStudyState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ payload: string; updated_at: string }>`
      select payload, updated_at from study_state where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return { payload: null as string | null, updatedAt: null as string | null };
    return { payload: row.payload, updatedAt: row.updated_at };
  });

export const saveStudyState = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    if (!input || typeof input !== "object" || typeof (input as { payload?: unknown }).payload !== "string") {
      throw new Error("Invalid study state");
    }
    const payload = (input as { payload: string }).payload;
    if (payload.length > 500_000) throw new Error("Study state is too large to sync");
    JSON.parse(payload);
    return { payload };
  })
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into study_state (user_id, payload, updated_at)
      values (${context.userId}, ${data.payload}, now())
      on conflict (user_id) do update set payload = excluded.payload, updated_at = now()
    `;
    return { ok: true as const };
  });
