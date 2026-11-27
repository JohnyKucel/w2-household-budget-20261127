import { household } from "./data.js";
import { addedTransactions, billsView, budgetView, dashboardView, extraSavings, goalsView, paidBills, planEdits, reportsView, transactionsView } from "./views.js";

const app = document.getElementById("app");
const year = document.getElementById("year");
year.textContent = String(new Date().getFullYear());

const routes = {
  "/": { title: "Dashboard", render: dashboardView },
  "/budget": { title: "Budget", render: budgetView },
  "/transactions": { title: "Transactions", render: () => transactionsView(currentFilter) },
  "/bills": { title: "Bills", render: billsView },
  "/goals": { title: "Goals", render: goalsView },
  "/reports": { title: "Reports", render: reportsView },
};

let currentFilter = "all";

function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return routes[hash] ? hash : "/";
}

function render() {
  const path = currentPath();
  const route = routes[path];
  app.innerHTML = route.render();
  document.title = route.title + " - " + household.name + " Budget";
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + path);
    if (link.getAttribute("href") === "#" + path) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}

document.querySelector("nav").addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  currentFilter = "all";
});

app.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id !== "add-form") return;
  const data = new FormData(form);
  const amount = Number(data.get("amount"));
  const desc = String(data.get("desc") || "").trim();
  if (!desc || !(amount > 0)) return;
  addedTransactions.unshift({
    date: "Nov " + household.dayOfMonth,
    desc,
    category: String(data.get("category")),
    amount,
    kind: String(data.get("kind")),
  });
  form.reset();
  render();
  const note = document.getElementById("add-note");
  if (note) note.textContent = "Added " + desc + " (" + (String(data.get("kind")) === "income" ? "+" : "-") + "$" + amount.toFixed(2) + "). Totals updated.";
});

app.addEventListener("change", (event) => {
  const select = event.target;
  if (select.id === "tx-filter") {
    currentFilter = select.value;
    render();
  }
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const payName = button.getAttribute("data-pay");
  if (payName) {
    paidBills.add(payName);
    render();
    return;
  }
  const goalName = button.getAttribute("data-goal");
  if (goalName) {
    extraSavings.set(goalName, (extraSavings.get(goalName) ?? 0) + 50);
    render();
    return;
  }
  const planId = button.getAttribute("data-save-plan");
  if (planId) {
    const input = app.querySelector(`input[data-plan="${planId}"]`);
    if (input) {
      const value = Number(input.value);
      if (value >= 0) planEdits.set(planId, value);
    }
    render();
  }
});

window.addEventListener("hashchange", render);
render();
