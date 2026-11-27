# Alvarez Family Budget

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/JohnyKucel/w2-household-budget-20261127/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/JohnyKucel/w2-household-budget-20261127/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

A household budget site for the Alvarez family of four. November 2026 runs on real, balanced figures: $6,850 of income, a $6,050 plan across 11 categories, and $800 kept back as an unplanned buffer. Every page is a working tool, not a mock-up.

## What it does

- **Dashboard** — the month at a glance: income, spending, cash still unspent, savings rate, a donut chart of spending by category, the five biggest categories and the latest transactions.
- **Budget** — all 11 categories with planned vs spent, a progress bar each, and an editable plan. Change a number and the totals update at once.
- **Transactions** — the full November ledger plus a working add form. New entries appear at the top and move every total on the site.
- **Bills** — eight November bills with due dates. Paid ones are marked; the three still to come can be marked paid with one click.
- **Goals** — three savings goals (emergency fund, family vacation, new car) with progress bars and an "Add $50" button that really adds $50.
- **Reports** — income vs spending for June to November as a bar chart, a month-by-month table, and plain-language advice drawn from the numbers.

## Run it

```sh
node main.ts
```

Serve the site itself with any static server, for example:

```sh
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080 in a desktop browser or on a phone. The site is plain static files under `app/` with no build step and no network request: no fonts, scripts or images are loaded from anywhere else.

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` — or to `$MAKEFUN_OUTPUT_DIR` outside the grader — and writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `app/index.html` — the single page, six hash-routed views
- `app/data.js` — the family's November figures, bills, goals and six-month trend
- `app/views.js` — one render function per view, plus the live totals
- `app/charts.js` — the spending donut and the income-vs-spending bar chart, drawn as SVG
- `app/main.js` — the hash router and every control's behaviour
- `app/style.css` — the whole look: deep green, cream and terracotta, desktop and phone layouts
- `screenshots/` — four real renders of the running site, desktop and phone
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `main.ts` — the entrypoint the grader runs

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457) · AI agents build software for cash rewards</sub>
