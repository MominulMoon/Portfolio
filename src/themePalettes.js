export const colorPalettes = {
  current: {
    accentPrimary: "#00d4ff",
    accentSecondary: "#0099cc",
    gradient: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
    gradientHover: "linear-gradient(135deg, #00bfea 0%, #0088bb 100%)",
    borderAccent: "rgba(0, 212, 255, 0.15)",
    glowPrimaryRgb: "0, 212, 255",
    glowSecondaryRgb: "0, 153, 204",
  },
  green: {
    accentPrimary: "#4ade80",
    accentSecondary: "#16a34a",
    gradient: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
    gradientHover: "linear-gradient(135deg, #36d977 0%, #12873f 100%)",
    borderAccent: "rgba(74, 222, 128, 0.2)",
    glowPrimaryRgb: "74, 222, 128",
    glowSecondaryRgb: "22, 163, 74",
  },
  orange: {
    accentPrimary: "#fb923c",
    accentSecondary: "#ea580c",
    gradient: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
    gradientHover: "linear-gradient(135deg, #f77f22 0%, #cf4a08 100%)",
    borderAccent: "rgba(251, 146, 60, 0.2)",
    glowPrimaryRgb: "251, 146, 60",
    glowSecondaryRgb: "234, 88, 12",
  },
  purple: {
    accentPrimary: "#a78bfa",
    accentSecondary: "#7c3aed",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    gradientHover: "linear-gradient(135deg, #9674f5 0%, #6c2fd1 100%)",
    borderAccent: "rgba(167, 139, 250, 0.2)",
    glowPrimaryRgb: "167, 139, 250",
    glowSecondaryRgb: "124, 58, 237",
  },
  darkBlue: {
    accentPrimary: "#60a5fa",
    accentSecondary: "#1d4ed8",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)",
    gradientHover: "linear-gradient(135deg, #438ff5 0%, #1a44bc 100%)",
    borderAccent: "rgba(96, 165, 250, 0.2)",
    glowPrimaryRgb: "96, 165, 250",
    glowSecondaryRgb: "29, 78, 216",
  },
};

export const paletteDots = [
  { id: "current", label: "Default cyan", color: "#00d4ff" },
  { id: "green", label: "Green", color: "#4ade80" },
  { id: "orange", label: "Orange", color: "#fb923c" },
  { id: "purple", label: "Purple", color: "#a78bfa" },
  { id: "darkBlue", label: "Dark blue", color: "#60a5fa" },
];

export function applyThemePalette(paletteId) {
  const palette = colorPalettes[paletteId] || colorPalettes.current;
  const root = document.documentElement;
  root.style.setProperty("--accent-primary", palette.accentPrimary);
  root.style.setProperty("--accent-secondary", palette.accentSecondary);
  root.style.setProperty("--accent-gradient", palette.gradient);
  root.style.setProperty("--accent-gradient-hover", palette.gradientHover);
  root.style.setProperty("--border-accent", palette.borderAccent);
  root.style.setProperty("--glow-primary-rgb", palette.glowPrimaryRgb);
  root.style.setProperty("--glow-secondary-rgb", palette.glowSecondaryRgb);
  localStorage.setItem("portfolio-theme", paletteId);
}

export function getStoredThemeId() {
  return localStorage.getItem("portfolio-theme") || "current";
}
