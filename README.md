# Contract Law Masterclass

A study application for Nigerian contract law: lessons, a case library, flashcards with spaced repetition, quizzes, an IRAC lab, notes, a personal document library, and a tutor.

Created for Browne.

## Study without an account

Progress, notes, and flashcard reviews are saved in this browser. Uploaded documents stay in the browser as well. The interface says when a record is only on this device.

## Account sync

Email, Google, and X sign-in are enabled. Signed-in progress syncs to the database. Uploaded files are not uploaded to the account.

## Tutor

The tutor calls the xAI API from the server when `XAI_API_KEY` is available. The key is never sent to the browser. If the key is absent, the tutor answers from the course library and labels that mode. It is study help, not legal advice.

## Legal content

English cases are labelled as English. Several Nigerian entries tell you to confirm the facts in the law report before quoting them. Do not treat the lessons as a substitute for the judgment or for advice on a real dispute.

## Scripts

- `npm run dev` starts the app.
- `npm run build` builds for production and applies database migrations.
- `npm run typecheck` checks TypeScript.

No `.env` file is required in this workspace. Deployment injects the database and auth settings.
