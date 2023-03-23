import { Tuple } from "@mantine/core";

const DARK: Tuple<string, 10> = [
  "#C1C2C5",
  "#A6A7AB",
  "#909296",
  "#5c5f66",
  "#373A40",
  "#2C2E33",
  "#25262b",
  "#1A1B1E",
  "#141517",
  "#101113",
];
const GRAY: Tuple<string, 10> = [
  "#f9fafb",
  "#f3f4f6",
  "#e5e7eb",
  "#d1d5db",
  "#9ca3af",
  "#6b7280",
  "#4b5563",
  "#374151",
  "#1f2937",
  "#111827",
];
const RED: Tuple<string, 10> = [
  "#fef2f2",
  "#fee2e2",
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
];
const PINK: Tuple<string, 10> = [
  "#fdf2f8",
  "#fce7f3",
  "#fbcfe8",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#9d174d",
  "#831843",
];
// Tailwind Fuchsia
const GRAPE: Tuple<string, 10> = [
  "#fdf4ff",
  "#fae8ff",
  "#f5d0fe",
  "#f0abfc",
  "#e879f9",
  "#d946ef",
  "#c026d3",
  "#a21caf",
  "#86198f",
  "#701a75",
];
const VIOLET: Tuple<string, 10> = [
  "#f5f3ff",
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
];
const INDIGO: Tuple<string, 10> = [
  "#eef2ff",
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
];
const BLUE: Tuple<string, 10> = [
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
];
// Tailwind Emerald
const GREEN: Tuple<string, 10> = [
  "#ecfdf5",
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
];
const CYAN: Tuple<string, 10> = [
  "#ecfeff",
  "#cffafe",
  "#a5f3fc",
  "#67e8f9",
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
];
const TEAL: Tuple<string, 10> = [
  "#f0fdfa",
  "#ccfbf1",
  "#99f6e4",
  "#5eead4",
  "#2dd4bf",
  "#14b8a6",
  "#0d9488",
  "#0f766e",
  "#115e59",
  "#134e4a",
];
const LIME: Tuple<string, 10> = [
  "#f7fee7",
  "#ecfccb",
  "#d9f99d",
  "#bef264",
  "#a3e635",
  "#84cc16",
  "#65a30d",
  "#4d7c0f",
  "#3f6212",
  "#365314",
];
// Tailwind Amber
const YELLOW: Tuple<string, 10> = [
  "#fffbeb",
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
  "#92400e",
  "#78350f",
];
const ORANGE: Tuple<string, 10> = [
  "#fff7ed",
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#c2410c",
  "#9a3412",
  "#7c2d12",
];

const asColor = <T>(color: { [K in keyof T]: Tuple<string, 10> }) => color;

export const COLORS = asColor({
  dark: DARK,
  gray: GRAY,
  red: RED,
  pink: PINK,
  grape: GRAPE,
  violet: VIOLET,
  indigo: INDIGO,
  blue: BLUE,
  cyan: CYAN,
  teal: TEAL,
  green: GREEN,
  lime: LIME,
  yellow: YELLOW,
  orange: ORANGE,
  primary: INDIGO,
  secondary: GRAY,
  success: GREEN,
  error: RED,
});

export type Color = keyof typeof COLORS | `${keyof typeof COLORS}.${number}`;
