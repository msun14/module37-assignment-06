# FITLOG
### Train with intent. Log every set.

A complete, beginner-readable workout library and planning app built with **Next.js App Router, React and Tailwind CSS**. It follows the supplied dark FitLog layouts and uses the supplied logo and banner.

## Start here

1. Install Node.js 22 LTS (22.13 or newer).
2. Extract the ZIP and open the **fitlog** folder in VS Code.
3. Open a terminal in that folder and run:

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**. All source files are already in their correct folders. You do not need to run `create-next-app` or paste the files into another starter.

The default mode requests the real assignment API. No API key or database is required.

## Features

- Responsive home page with a three-column desktop library and in-page browse link.
- Live API fetching through Next.js Route Handlers, with skeleton loading and retry states.
- Dynamic workout detail pages with specifications, instructions and action buttons.
- Shared Context API state for Today's Plan, Saved and navbar counters.
- Duplicate prevention and a maximum of five **unfinished** planned lifts.
- Mark-as-done, remove, view-details and toast notifications.
- Live exercise, minute and calorie totals for Today's Plan.
- Duration, calorie and rating sorting on either plan tab.
- Search the library by workout name or muscle-group tag.
- Browser persistence with storage validation and synchronization across tabs.
- Accessible labels, visible keyboard focus, skip link and reduced-motion styles.
- Custom not-found page, failed-image fallback and Netlify configuration.

## Technology

| Tool | Purpose |
| --- | --- |
| Next.js 16.3.4 | App Router, Server Components, Route Handlers and dynamic pages |
| React / React DOM 19.2.6 | Components, props, hooks, events and Context API |
| Tailwind CSS 4.2.1 | Responsive grid utilities and styling pipeline |
| Custom CSS | Precise dark UI layout, spacing and reusable component styles |
| Lucide React | Consistent interface icons |
| Sonner | Toast notifications |
| localStorage | Plan and saved-list persistence in the current browser |
| Node test runner / ESLint | Core behavior checks and code quality |

Dependencies are pinned and a package-lock.json is included. No Git setup or commits are required to use this package.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start local development |
| `npm run lint` | Check the code |
| `npm test` | Run eight core logic and API-adapter tests |
| `npm run check:api` | Verify the live list and first detail response from your machine |
| `npm run build` | Produce the Next.js production build |
| `npm start` | Run the production build locally |
| `node scripts/smoke.mjs` | Check nine local production HTTP routes with demo data after building |

## Folder map

| Folder / file | What it contains |
| --- | --- |
| `src/app/` | Pages, layout, shared CSS, loading/error/404 pages |
| `src/app/workouts/[id]/page.jsx` | Dynamic server-rendered details page |
| `src/app/my-plan/page.jsx` | My Plan page shell |
| `src/app/api/workouts/` | Same-origin API Route Handlers |
| `src/components/` | Navbar, hero, cards, details actions, plan view and reusable UI |
| `src/context/PlanContext.jsx` | Shared state, actions, storage and toast integration |
| `src/hooks/useWorkouts.js` | Fetching, cancellation, loading, retry and error state |
| `src/lib/normalize.js` | API field mapping and validation |
| `src/lib/workouts.js` | Server-side API requests and optional demo mode |
| `src/lib/plan.js` | Pure plan transitions, totals, sorting and storage validation |
| `src/data/demo-workouts.json` | Twelve authored fixtures for opt-in testing only |
| `public/images/` | Your logo, banner and image fallback |
| `public/fonts/` | Local condensed display font and its license |
| `scripts/` | Live API check and local HTTP smoke check |
| `tests/` | Core logic tests |
| `docs/SETUP-GUIDE.md` | Detailed file-by-file implementation and deployment guide |
| `netlify.toml` | Next.js build settings for Netlify |

## Live API and demo mode

The API is configured in `src/lib/workouts.js`:

- List: https://api.abcz.workers.dev/api/fitlog
- Details: https://api.abcz.workers.dev/api/fitlog/:id

**The live service could not be reached in the delivery environment. Its response schema and remote images are not verified.** The adapter handles common wrappers and field names, but run `npm run check:api` locally before submission. If the provider uses different keys, edit the one mapping file, `src/lib/normalize.js`.

For an offline UI demonstration, copy `.env.example` to `.env.local` and change:

```dotenv
FITLOG_DEMO_MODE=true
```

Restart the dev server. A visible banner identifies demo mode. These sample records are not a copied API dataset; their temporary images reuse your supplied banner. Set the value back to `false` before final testing and deployment. Rebuild production output after changing modes.

`npm run check:api` reads shell environment variables; it does not load `.env.local`. To check an overridden URL from that file, run `node --env-file=.env.local scripts/check-api.mjs`.

## Behavior decisions

- A workout may exist in both Plan and Saved. Removing it from one list leaves the other unchanged.
- Mark as Done retains the row, disables its completion button and frees one active slot.
- Plan counter and summary include all rows still in Today's Plan, including completed rows. Saved does not affect those totals.
- Default sorting is duration, shortest first. Calories and rating sort highest first. Unknown values appear last.
- The stored plan stays until you remove items; there is no automatic midnight reset or cross-device account sync.
- Missing numeric API fields show a dash / Not specified. Totals sum the numeric values that are available.

## Images and typography

The original `banner.png` and `logo.png` are included unchanged. API artwork is used in live mode. To add your own workout images, see the exact instructions in `docs/SETUP-GUIDE.md`.

Headings use a bundled condensed **Nimbus Sans Narrow Bold** font. The layout is based on the screenshots, but pixel-exact font matching and browser visual QA are not claimed. You can supply an Oswald font file and replace the local font path in `src/app/layout.jsx`; instructions are in the guide.

## Netlify without Git

The app needs Netlify's Next.js runtime, so do not drag only `public/` or `.next/` into a static upload. Do not add an SPA `/* /index.html 200` redirect.

From the project folder, after local checks:

```bash
npx netlify-cli@latest login
npx netlify-cli@latest deploy
```

Choose/create a Netlify project when prompted. The current CLI builds by default and creates a draft deployment. Keep the included configuration: build `npm run build`, publish `.next`, Node 22. Netlify automatically installs its Next.js adapter. Inspect the draft and refresh a real `/workouts/<id>` URL and `/my-plan` directly.

When the draft is ready:

```bash
npx netlify-cli@latest deploy --prod
```

These commands are instructions for you; this package has not been deployed to a Netlify account.

## Verification and limits

- Production Next.js build: passed.
- ESLint: passed.
- Eight core behavior/API-adapter tests: passed.
- Nine production HTTP route checks using demo fixtures: passed.
- Browser interaction and visual checks: not completed; the available browser could not access the local server.
- Live assignment API, actual remote images and Netlify deployment: not verified here.

See the manual checklist in the guide before submission.

## Official references

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js dynamic routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Netlify CLI deploy](https://cli.netlify.com/commands/deploy/)

Reviewed September 23, 2026.
