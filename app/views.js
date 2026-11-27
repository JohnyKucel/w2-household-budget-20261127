import { bills, categories, goals, household, income, money, moneyShort, monthlyTrend, tips, totalIncome, totalPlanned, totalSpent, transactions } from "./data.js";
import { categoryLegend, donutChart, trendChart } from "./charts.js";

export const addedTransactions = [];
export const paidBills = new Set();
export const extraSavings = new Map();
export const planEdits = new Map();

export function liveSpent() {
  return totalSpent() + addedTransactions.filter((row) => row.kind === "expense").reduce((sum, row) => sum + row.amount, 0);
}

export function liveIncome() {
  return totalIncome() + addedTransactions.filter((row) => row.kind === "income").reduce((sum, row) => sum + row.amount, 0);
}

export function livePlanned() {
  return categories.reduce((sum, row) => sum + (planEdits.get(row.id) ?? row.planned), 0);
}

export function categorySpent(row) {
  return row.spent + addedTransactions.filter((item) => item.category === row.name && item.kind === "expense").reduce((sum, item) => sum + item.amount, 0);
}

export function categoryPlanned(row) {
  return planEdits.get(row.id) ?? row.planned;
}

export function progressBar(spent, planned) {
  const pct = Math.min(100, Math.round((spent / planned) * 100));
  const over = spent > planned;
  return `<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${pct} percent of plan used">
    <span class="${over ? "fill over" : "fill"}" style="width:${pct}%"></span>
  </div>`;
}

export function statCard(label, value, sub) {
  return `<article class="stat"><p class="stat-label">${label}</p><p class="stat-value">${value}</p><p class="stat-sub">${sub}</p></article>`;
}

export function dashboardView() {
  const spent = liveSpent();
  const left = liveIncome() - spent;
  const monthPct = Math.round((household.dayOfMonth / household.daysInMonth) * 100);
  const rows = categories
    .slice()
    .sort((a, b) => categorySpent(b) - categorySpent(a))
    .slice(0, 5)
    .map((row) => {
      const used = categorySpent(row);
      const planned = categoryPlanned(row);
      return `<li class="top-row"><span class="top-name">${row.icon} ${row.name}</span>${progressBar(used, planned)}<strong>${moneyShort(used)}</strong><span class="muted">of ${moneyShort(planned)}</span></li>`;
    })
    .join("");
  const recent = transactions.slice(0, 5).map((row) => transactionRow(row)).join("");
  return `<section class="hero">
    <div>
      <p class="eyebrow">${household.month} &middot; Day ${household.dayOfMonth} of ${household.daysInMonth}</p>
      <h1>November is on track.</h1>
      <p class="lede">The Alvarez family has spent ${money(spent)} of ${money(liveIncome())} earned. ${money(left)} is still unspent, and every bill due so far is paid.</p>
      <p><a class="button" href="#/transactions">Add a transaction</a> <a class="button ghost" href="#/budget">Review the budget</a></p>
    </div>
    <div class="hero-chart">${donutChart(220)}<ul class="legend">${categoryLegend()}</ul></div>
  </section>
  <section class="stats">
    ${statCard("Income", money(liveIncome()), "Maya $4,200 &middot; Daniel $2,650")}
    ${statCard("Spent so far", money(spent), moneyShort(livePlanned() - spent) + " left of the " + moneyShort(livePlanned()) + " plan")}
    ${statCard("Still unspent", money(left), "Includes the $800 unplanned buffer")}
    ${statCard("Savings rate", "17.8%", moneyShort(1400) + " moved to savings on payday")}
  </section>
  <section class="split">
    <article class="card">
      <h2>Biggest spending so far</h2>
      <ul class="top-list">${rows}</ul>
      <p><a href="#/budget">See every category &rarr;</a></p>
    </article>
    <article class="card">
      <h2>Latest transactions</h2>
      <ul class="tx-list">${recent}</ul>
      <p><a href="#/transactions">All transactions &rarr;</a></p>
    </article>
  </section>
  <section class="card">
    <h2>Month progress</h2>
    <p>${household.dayOfMonth} of ${household.daysInMonth} days gone (${monthPct}%). Spending is at ${Math.round((spent / livePlanned()) * 100)}% of the monthly plan, so the household is running slightly ahead of the calendar.</p>
    ${progressBar(spent, livePlanned())}
    <h2 class="tips-title">What to do next</h2>
    <ul class="tips">${tips.slice(0, 3).map((tip) => `<li><strong>${tip.title}.</strong> ${tip.body}</li>`).join("")}</ul>
  </section>`;
}

export function budgetView() {
  const rows = categories.map((row) => {
    const used = categorySpent(row);
    const planned = categoryPlanned(row);
    const left = planned - used;
    const state = left < 0 ? "over by " + money(Math.abs(left)) : money(left) + " left";
    return `<article class="budget-row">
      <div class="budget-head"><h3>${row.icon} ${row.name}</h3><strong>${money(used)} <span class="muted">of ${money(planned)}</span></strong></div>
      ${progressBar(used, planned)}
      <p class="muted">${row.note}</p>
      <p class="budget-foot"><span class="${left < 0 ? "over-text" : "ok-text"}">${state}</span>
      <label>Plan <input type="number" min="0" step="10" value="${planned}" data-plan="${row.id}" aria-label="Planned amount for ${row.name}"> <button class="small" data-save-plan="${row.id}">Update plan</button></label></p>
    </article>`;
  }).join("");
  return `<section class="page-head">
    <h1>November budget</h1>
    <p class="lede">Planned ${money(livePlanned())} against ${money(liveIncome())} of income. ${money(liveIncome() - livePlanned())} stays unplanned as a buffer for surprises. Change any plan below and the totals update at once.</p>
  </section>
  <section class="stats">
    ${statCard("Planned", money(livePlanned()), "Across 11 categories")}
    ${statCard("Spent", money(liveSpent()), "Through November 27")}
    ${statCard("Left in plan", money(livePlanned() - liveSpent()), "To last until November 30")}
  </section>
  <section class="budget-grid">${rows}</section>`;
}

export function transactionRow(row) {
  const sign = row.kind === "income" ? "+" : "&minus;";
  return `<li class="tx-row"><span class="tx-date">${row.date}</span><span class="tx-desc">${row.desc}<small>${row.category}</small></span><strong class="${row.kind}">${sign}${money(row.amount)}</strong></li>`;
}

export function transactionsView(filter) {
  const all = [...addedTransactions, ...transactions];
  const shown = filter === "all" ? all : all.filter((row) => row.kind === filter || row.category === filter);
  const options = ["all", "income", "expense", ...categories.map((row) => row.name)]
    .map((name) => `<option value="${name}" ${name === filter ? "selected" : ""}>${name === "all" ? "All transactions" : name}</option>`)
    .join("");
  return `<section class="page-head">
    <h1>Transactions</h1>
    <p class="lede">November's individual payments, newest first. Income ${money(liveIncome())}, spending ${money(liveSpent())} across the month.</p>
  </section>
  <section class="card form-card">
    <h2>Add a transaction</h2>
    <form id="add-form">
      <label>Description <input name="desc" required maxlength="80" placeholder="e.g. GreenMart weekly shop"></label>
      <label>Category <select name="category">${categories.map((row) => `<option>${row.name}</option>`).join("")}<option>Income</option></select></label>
      <label>Amount ($) <input name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></label>
      <label>Type <select name="kind"><option value="expense">Spending</option><option value="income">Income</option></select></label>
      <button class="button" type="submit">Add transaction</button>
      <p class="form-note" id="add-note" role="status"></p>
    </form>
  </section>
  <section class="card">
    <h2>November ledger</h2>
    <p><label>Show <select id="tx-filter" aria-label="Filter transactions">${options}</select></label>
    <span class="muted">${shown.length} of ${all.length} shown</span></p>
    <ul class="tx-list">${shown.map((row) => transactionRow(row)).join("") || "<li class='muted'>Nothing matches this filter yet.</li>"}</ul>
  </section>`;
}

export function billsView() {
  const upcoming = bills.filter((row) => row.status === "upcoming" && !paidBills.has(row.name));
  const upcomingTotal = upcoming.reduce((sum, row) => sum + row.amount, 0);
  const rows = bills.map((row) => {
    const paid = row.status === "paid" || paidBills.has(row.name);
    return `<li class="bill-row"><span class="bill-name">${row.name}<small>${row.note}</small></span><span class="bill-due">Due ${row.due}</span><strong>${money(row.amount)}</strong>
    ${paid ? '<span class="badge paid">Paid</span>' : `<button class="small" data-pay="${row.name}">Mark paid</button>`}</li>`;
  }).join("");
  return `<section class="page-head">
    <h1>Bills &amp; due dates</h1>
    <p class="lede">Five bills paid, three still to come. ${money(upcomingTotal)} leaves the account before December 1, all of it already inside the monthly plan.</p>
  </section>
  <section class="stats">
    ${statCard("Paid so far", money(bills.filter((row) => row.status === "paid").reduce((sum, row) => sum + row.amount, 0)), "5 bills, on time")}
    ${statCard("Still to pay", money(upcomingTotal), upcoming.length + " bills before Dec 1")}
    ${statCard("Next bill", "Car insurance", money(146) + " due Nov 28, autopay on")}
  </section>
  <section class="card"><h2>November bills</h2><ul class="bill-list">${rows}</ul>
  <p class="muted">Autopay is on for electric, internet, phones and car insurance. Rent is paid by standing order on the 1st.</p></section>`;
}

export function goalsView() {
  const rows = goals.map((goal) => {
    const saved = goal.saved + (extraSavings.get(goal.name) ?? 0);
    const pct = Math.round((saved / goal.target) * 100);
    return `<article class="card goal-card">
      <h3>${goal.name}</h3>
      <p class="goal-numbers"><strong>${money(saved)}</strong> <span class="muted">of ${money(goal.target)} &middot; ${pct}%</span></p>
      ${progressBar(saved, goal.target)}
      <p>${goal.note}</p>
      <p><button class="small" data-goal="${goal.name}">Add $50 to this goal</button> <span class="muted">${money(goal.target - saved)} to go</span></p>
    </article>`;
  }).join("");
  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved + (extraSavings.get(goal.name) ?? 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  return `<section class="page-head">
    <h1>Savings goals</h1>
    <p class="lede">${money(totalSaved)} saved toward ${money(totalTarget)} of goals. The emergency fund comes first: it is the money that keeps a broken car or a sick week from becoming debt.</p>
  </section>
  <section class="stats">
    ${statCard("Saved in total", money(totalSaved), "Across 3 goals")}
    ${statCard("Emergency fund", "65.6%", money(5250) + " of " + money(8000))}
    ${statCard("Monthly saving", money(1400), "Moved on payday, every month")}
  </section>
  <section class="goal-grid">${rows}</section>
  <section class="card"><h2>How the goals are funded</h2>
  <p>The $1,400 monthly saving is split on payday: $800 to the emergency fund, $350 to the new car and $250 to the vacation. At this pace the emergency fund is full in February, and the vacation is paid for by June.</p></section>`;
}

export function reportsView() {
  const rows = monthlyTrend.map((row) => {
    const rate = Math.round(((row.income - row.spent) / row.income) * 100);
    return `<li class="report-row"><span>${row.month}</span><span>Income ${money(row.income)}</span><span>Spent ${money(row.spent)}</span><strong>Saved ${rate}%</strong></li>`;
  }).join("");
  return `<section class="page-head">
    <h1>Reports &amp; trends</h1>
    <p class="lede">Six months of income against spending. November is the second-best saving month of the half year, at 17.8%.</p>
  </section>
  <section class="card">
    <h2>Income vs spending, June to November</h2>
    ${trendChart(640, 260)}
    <p class="legend-line"><span class="swatch" style="background:#1f5c46"></span> Income <span class="swatch" style="background:#c96f3f"></span> Spending</p>
  </section>
  <section class="card"><h2>Month by month</h2><ul class="report-list">${rows}</ul></section>
  <section class="card"><h2>What the numbers say</h2><ul class="tips">
    ${tips.map((tip) => `<li><strong>${tip.title}.</strong> ${tip.body}</li>`).join("")}
  </ul></section>`;
}
