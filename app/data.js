export const household = {
  name: "The Alvarez Family",
  members: ["Maya Alvarez", "Daniel Alvarez", "Sofia Alvarez", "Leo Alvarez"],
  month: "November 2026",
  monthLabel: "November",
  year: 2026,
  dayOfMonth: 27,
  daysInMonth: 30,
  currency: "USD",
};

export const income = [
  { source: "Maya's salary", detail: "Registered nurse, City General Hospital", amount: 4200, date: "Nov 1" },
  { source: "Daniel's salary", detail: "Electrician, BrightSpark Contracting", amount: 2650, date: "Nov 1" },
];

export const categories = [
  { id: "housing", name: "Housing", icon: "⌂", planned: 1850, spent: 1850, note: "Rent, 2-bed apartment on Maple Street" },
  { id: "groceries", name: "Groceries", icon: "◍", planned: 720, spent: 612, note: "Weekly shop at GreenMart, incl. school lunches" },
  { id: "utilities", name: "Utilities", icon: "≋", planned: 310, spent: 268, note: "Electric, water, internet and phones" },
  { id: "transport", name: "Transport", icon: "➤", planned: 380, spent: 341, note: "Fuel, bus passes and car upkeep" },
  { id: "dining", name: "Dining Out", icon: "✦", planned: 240, spent: 198, note: "Two family dinners out a month" },
  { id: "health", name: "Health", icon: "✚", planned: 210, spent: 175, note: "Pharmacy, dentist check-up, vitamins" },
  { id: "kids", name: "Kids & School", icon: "✎", planned: 420, spent: 385, note: "After-school club, books and Sofia's violin" },
  { id: "entertainment", name: "Entertainment", icon: "♪", planned: 160, spent: 142, note: "Streaming, cinema night and board games" },
  { id: "clothing", name: "Clothing", icon: "♡", planned: 120, spent: 86, note: "Winter coats for Sofia and Leo" },
  { id: "savings", name: "Savings", icon: "⬢", planned: 1400, spent: 1400, note: "Moved to savings on payday, every month" },
  { id: "misc", name: "Everyday Misc", icon: "✳", planned: 240, spent: 173, note: "Haircuts, gifts and small surprises" },
];

export const transactions = [
  { date: "Nov 27", desc: "GreenMart weekly shop", category: "Groceries", amount: 96.40, kind: "expense" },
  { date: "Nov 26", desc: "Shell fuel, family car", category: "Transport", amount: 48.20, kind: "expense" },
  { date: "Nov 25", desc: "Sofia's violin lesson", category: "Kids & School", amount: 60.00, kind: "expense" },
  { date: "Nov 24", desc: "City pharmacy, Leo's inhaler", category: "Health", amount: 32.50, kind: "expense" },
  { date: "Nov 22", desc: "Family pizza night", category: "Dining Out", amount: 54.80, kind: "expense" },
  { date: "Nov 21", desc: "GreenMart weekly shop", category: "Groceries", amount: 88.15, kind: "expense" },
  { date: "Nov 20", desc: "Cinema night, four tickets", category: "Entertainment", amount: 46.00, kind: "expense" },
  { date: "Nov 18", desc: "Water bill, City Water", category: "Utilities", amount: 64.30, kind: "expense" },
  { date: "Nov 17", desc: "Leo's winter coat", category: "Clothing", amount: 58.00, kind: "expense" },
  { date: "Nov 15", desc: "Internet, FiberHome 200 Mbps", category: "Utilities", amount: 79.00, kind: "expense" },
  { date: "Nov 14", desc: "GreenMart weekly shop", category: "Groceries", amount: 91.60, kind: "expense" },
  { date: "Nov 12", desc: "Electric bill, City Power", category: "Utilities", amount: 132.40, kind: "expense" },
  { date: "Nov 8", desc: "After-school club, November", category: "Kids & School", amount: 145.00, kind: "expense" },
  { date: "Nov 1", desc: "Rent, Maple Street apartment", category: "Housing", amount: 1850.00, kind: "expense" },
  { date: "Nov 1", desc: "Maya's salary", category: "Income", amount: 4200.00, kind: "income" },
  { date: "Nov 1", desc: "Daniel's salary", category: "Income", amount: 2650.00, kind: "income" },
  { date: "Nov 1", desc: "Transfer to savings", category: "Savings", amount: 1400.00, kind: "expense" },
];

export const bills = [
  { name: "Rent, Maple Street", amount: 1850.00, due: "Nov 1", status: "paid", note: "Paid on the 1st, as always" },
  { name: "Electric, City Power", amount: 132.40, due: "Nov 12", status: "paid", note: "Autopay cleared Nov 12" },
  { name: "Internet, FiberHome", amount: 79.00, due: "Nov 15", status: "paid", note: "Autopay cleared Nov 15" },
  { name: "Water, City Water", amount: 64.30, due: "Nov 18", status: "paid", note: "Paid Nov 18" },
  { name: "Phones, two lines", amount: 118.00, due: "Nov 22", status: "paid", note: "Autopay cleared Nov 22" },
  { name: "Car insurance", amount: 146.00, due: "Nov 28", status: "upcoming", note: "Due tomorrow, autopay is on" },
  { name: "Streaming bundle", amount: 18.00, due: "Nov 29", status: "upcoming", note: "Due Nov 29" },
  { name: "Gym, family pass", amount: 45.00, due: "Dec 1", status: "upcoming", note: "First bill of December" },
];

export const goals = [
  { name: "Emergency fund", target: 8000, saved: 5250, note: "Six months of rent, for peace of mind" },
  { name: "Family vacation", target: 2400, saved: 1180, note: "A week by the sea next summer" },
  { name: "New family car", target: 12000, saved: 3400, note: "Replace the old sedan in two years" },
];

export const monthlyTrend = [
  { month: "Jun", income: 6850, spent: 5780 },
  { month: "Jul", income: 6850, spent: 5920 },
  { month: "Aug", income: 6850, spent: 5610 },
  { month: "Sep", income: 6850, spent: 6040 },
  { month: "Oct", income: 6850, spent: 5895 },
  { month: "Nov", income: 6850, spent: 5630 },
];

export const tips = [
  { title: "Groceries are $108 under plan", body: "Three weekly shops came in under $100. Keep the list on the fridge and the fourth shop stays under plan too." },
  { title: "Dining out has $42 left", body: "One more family dinner out fits the month. Pick a place under $40 and the category ends on plan." },
  { title: "Savings rate is 17.8%", body: "$1,220 of November's $6,850 income is still unspent. Moving $200 more to the emergency fund this week keeps the habit strong." },
  { title: "Car insurance lands tomorrow", body: "$146 leaves by autopay on Nov 28. It is already inside the Transport plan, so nothing else needs to move." },
];

export function money(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function moneyShort(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function totalIncome() {
  return income.reduce((sum, row) => sum + row.amount, 0);
}

export function totalPlanned() {
  return categories.reduce((sum, row) => sum + row.planned, 0);
}

export function totalSpent() {
  return categories.reduce((sum, row) => sum + row.spent, 0);
}

export function categoryById(id) {
  return categories.find((row) => row.id === id);
}
