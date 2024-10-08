export type ThemeColor = {
  name: string;
  id: string;
  colors: string[];
  eyeRadius: EyeRadius;
  qrStyle: QRStyle;
  isCustom?: boolean;
}

export type EyeRadius = 0 | 10 | 20;
export type QRStyle = "squares" | "dots" | "fluid";
export type TabType = "default" | "custom" | "explore" | "favorites";

export const themes: ThemeColor[] = [
  { id: "Default", name: "Default", colors: ["#FFFFFF", "#000000", "#000000"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Inverted Default", name: "Inverted Default", colors: ["#000000", "#FFFFFF", "#FFFFFF"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Night", name: "Night", colors: ["#000000", "#070d24", "#0e123a"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Blood", name: "Blood", colors: ["#2c0404", "#dd2727", "#b33030"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Sunset", name: "Sunset", colors: ["#f7b733", "#fc4a1a", "#d81159"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Sky", name: "Sky", colors: ["#0f2027", "#203a43", "#2c5364"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Water", name: "Water", colors: ["#06042c", "#283ade", "#3041b3"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Forest", name: "Forest", colors: ["#0b6623", "#388e3c", "#4caf50"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Lion", name: "Lion", colors: ["#3e2b2b", "#b5651d", "#d9a566"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Fire", name: "Fire", colors: ["#ff0000", "#ff7f00", "#ffbf00"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Metal", name: "Metal", colors: ["#3a3a3a", "#7a7a7a", "#b5b5b5"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Space", name: "Space", colors: ["#000000", "#1c1c1c", "#383838"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Galaxy", name: "Galaxy", colors: ["#1c1b33", "#5c33ff", "#7e57c2"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Aurora", name: "Aurora", colors: ["#00ffcc", "#9933ff", "#cc00ff"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Moonlight", name: "Moonlight", colors: ["#333333", "#cccccc", "#b0c4de"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Shadow", name: "Shadow", colors: ["#1c1c1c", "#3b3b3b", "#5e5e5e"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Ocean Breeze", name: "Ocean Breeze", colors: ["#004f6e", "#00a0b0", "#00d9d2"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Sunrise", name: "Sunrise", colors: ["#ffdd00", "#ff7300", "#ff4e00"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Emerald", name: "Emerald", colors: ["#054d44", "#1abc9c", "#16a085"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Berry", name: "Berry", colors: ["#4b0f1f", "#9b1d39", "#d94e7b"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Rust", name: "Rust", colors: ["#4e1a1a", "#8b3e2f", "#d07f55"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Lavender", name: "Lavender", colors: ["#b19cd9", "#9370db", "#7b68ee"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Mint", name: "Mint", colors: ["#98ff98", "#3eb489", "#2e8b57"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Canyon", name: "Canyon", colors: ["#8c3f1f", "#d2691e", "#f4a460"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Cobalt", name: "Cobalt", colors: ["#002366", "#0047ab", "#4682b4"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Peach", name: "Peach", colors: ["#ffe5b4", "#ffad60", "#ff7f50"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Frost", name: "Frost", colors: ["#e0f7fa", "#81d4fa", "#4fc3f7"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Mystic", name: "Mystic", colors: ["#2b1b17", "#6e3b3b", "#b57281"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Autumn", name: "Autumn", colors: ["#4b2e0f", "#8b4513", "#c46210"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Dusk", name: "Dusk", colors: ["#3e1d45", "#6b0f74", "#aa2b94"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Cedar", name: "Cedar", colors: ["#4a2f27", "#a0522d", "#c08060"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Tropic", name: "Tropic", colors: ["#006d5b", "#00a693", "#66b2a7"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Brick", name: "Brick", colors: ["#7c0a02", "#9b4d46", "#ad6e5b"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Pine", name: "Pine", colors: ["#204c34", "#38755b", "#6a9975"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Blossom", name: "Blossom", colors: ["#e75480", "#f88379", "#f4a3a8"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Slate", name: "Slate", colors: ["#3b444b", "#5a6978", "#778899"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Clay", name: "Clay", colors: ["#836953", "#a57c65", "#b98d7f"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Twilight", name: "Twilight", colors: ["#4a536b", "#6a5acd", "#9370db"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Storm", name: "Storm", colors: ["#5b5b5b", "#737373", "#9e9e9e"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Teal", name: "Teal", colors: ["#008080", "#20b2aa", "#40e0d0"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Saffron", name: "Saffron", colors: ["#b5651d", "#ffb300", "#d87b1e"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Berry Crush", name: "Berry Crush", colors: ["#7b1fa2", "#ab47bc", "#ce93d8"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Meadow", name: "Meadow", colors: ["#3a5f0b", "#6b8e23", "#9acd32"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Bronze", name: "Bronze", colors: ["#8c4b0f", "#b87333", "#cd853f"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Cypress", name: "Cypress", colors: ["#2f4f4f", "#4b636e", "#708090"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Periwinkle", name: "Periwinkle", colors: ["#ccccff", "#b39ddb", "#9575cd"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Forest Berry", name: "Forest Berry", colors: ["#4b3f72", "#654e92", "#8b6fae"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Velvet", name: "Velvet", colors: ["#5c0923", "#7b1034", "#9e1d4d"], eyeRadius: 0, qrStyle: "squares" },
  { id: "Obsidian", name: "Obsidian", colors: ["#1c1c1c", "#2b2b2b", "#4a4a4a"], eyeRadius: 0, qrStyle: "squares" }
];

export const handleRandomTheme = (): ThemeColor => {
  return themes[Math.floor(Math.random() * themes.length)];
};

export const handleRandomThemeCustom = (): ThemeColor => {
  const bgColor = themes[Math.floor(Math.random() * themes.length)].colors[0];
  const fgColor = themes[Math.floor(Math.random() * themes.length)].colors[1];
  const eyeColor = themes[Math.floor(Math.random() * themes.length)].colors[2];
  return { name: "Custom", colors: [bgColor, fgColor, eyeColor], eyeRadius: 0, qrStyle: "squares", id: "custom", isCustom: false };
};