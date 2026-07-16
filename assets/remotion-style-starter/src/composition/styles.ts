export type StyleId =
  | "natural-retro-geometric"
  | "xiaohongshu-poster"
  | "relaxed-handwritten"
  | "american-vintage"
  | "cyber-brutalism";

export type StylePreset = {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  muted: string;
  displayFont: string;
  bodyFont: string;
  radius: number;
  motif: "dots" | "mascot" | "doodle" | "stamp" | "hud";
};

export const STYLE_PRESETS: Record<StyleId, StylePreset> = {
  "natural-retro-geometric": {
    background: "#DEE9BF",
    foreground: "#111111",
    accent: "#4C9953",
    secondary: "#FDCA57",
    muted: "#BC4937",
    displayFont: "Arial Black, Arial, sans-serif",
    bodyFont: "Arial, sans-serif",
    radius: 20,
    motif: "dots",
  },
  "xiaohongshu-poster": {
    background: "#FFF3D8",
    foreground: "#6B4A2F",
    accent: "#F79BB7",
    secondary: "#3BAFE3",
    muted: "#65D46E",
    displayFont: "Arial Rounded MT Bold, Arial, sans-serif",
    bodyFont: "Arial, sans-serif",
    radius: 38,
    motif: "mascot",
  },
  "relaxed-handwritten": {
    background: "#F7F1DF",
    foreground: "#1A1A1A",
    accent: "#EE1E25",
    secondary: "#16A7F2",
    muted: "#FFD94D",
    displayFont: "Marker Felt, Arial Black, sans-serif",
    bodyFont: "Arial, sans-serif",
    radius: 8,
    motif: "doodle",
  },
  "american-vintage": {
    background: "#22005A",
    foreground: "#FFF4D4",
    accent: "#0FA6B8",
    secondary: "#E95E3E",
    muted: "#3F9C5A",
    displayFont: "Rockwell, Georgia, serif",
    bodyFont: "Arial, sans-serif",
    radius: 48,
    motif: "stamp",
  },
  "cyber-brutalism": {
    background: "#0A0A0A",
    foreground: "#F5F5F5",
    accent: "#B8FF2C",
    secondary: "#FFFFFF",
    muted: "#8B8B8B",
    displayFont: "Arial Black, Arial, sans-serif",
    bodyFont: "Menlo, monospace",
    radius: 12,
    motif: "hud",
  },
};
