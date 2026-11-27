import { categories, moneyShort, monthlyTrend, totalSpent } from "./data.js";

const palette = ["#1f5c46", "#c96f3f", "#d9a441", "#5b8a72", "#7a6aa8", "#3f7d9e", "#a85d6e", "#8a9a5b", "#b07d4f", "#4f6d7a", "#946b2d"];

export function donutChart(size) {
  const total = totalSpent();
  const radius = 62;
  const thickness = 26;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const slices = categories
    .filter((row) => row.id !== "savings")
    .map((row, index) => {
      const share = row.spent / total;
      const length = share * circumference;
      const piece =
        `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${palette[index % palette.length]}" stroke-width="${thickness}" stroke-dasharray="${length.toFixed(1)} ${(circumference - length).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${center} ${center})" />`;
      offset += length;
      return piece;
    })
    .join("");
  return `<svg class="donut" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart of November spending by category">
    <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#eee5d3" stroke-width="${thickness}" />
    ${slices}
    <text x="${center}" y="${center - 6}" text-anchor="middle" class="donut-total">${moneyShort(total)}</text>
    <text x="${center}" y="${center + 16}" text-anchor="middle" class="donut-label">spent in Nov</text>
  </svg>`;
}

export function trendChart(width, height) {
  const max = 7000;
  const padLeft = 44;
  const padBottom = 26;
  const padTop = 12;
  const plotWidth = width - padLeft - 8;
  const plotHeight = height - padTop - padBottom;
  const groupWidth = plotWidth / monthlyTrend.length;
  const barWidth = 16;
  const bars = monthlyTrend
    .map((row, index) => {
      const x = padLeft + index * groupWidth + groupWidth / 2;
      const incomeHeight = (row.income / max) * plotHeight;
      const spentHeight = (row.spent / max) * plotHeight;
      return `<rect x="${(x - barWidth - 3).toFixed(1)}" y="${(padTop + plotHeight - incomeHeight).toFixed(1)}" width="${barWidth}" height="${incomeHeight.toFixed(1)}" rx="3" fill="#1f5c46" />
      <rect x="${(x + 3).toFixed(1)}" y="${(padTop + plotHeight - spentHeight).toFixed(1)}" width="${barWidth}" height="${spentHeight.toFixed(1)}" rx="3" fill="#c96f3f" />
      <text x="${x.toFixed(1)}" y="${height - 8}" text-anchor="middle" class="chart-axis">${row.month}</text>`;
    })
    .join("");
  const grid = [0, 2500, 5000].map((value) => {
    const y = padTop + plotHeight - (value / max) * plotHeight;
    return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - 8}" y2="${y.toFixed(1)}" stroke="#e7ddc8" stroke-width="1" />
    <text x="${padLeft - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis">$${(value / 1000).toFixed(0)}k</text>`;
  }).join("");
  return `<svg class="trend" viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Bar chart of income and spending, June to November">
    ${grid}${bars}
  </svg>`;
}

export function categoryLegend() {
  return categories
    .filter((row) => row.id !== "savings")
    .map((row, index) => `<li><span class="swatch" style="background:${palette[index % palette.length]}"></span>${row.name}<strong>${moneyShort(row.spent)}</strong></li>`)
    .join("");
}
