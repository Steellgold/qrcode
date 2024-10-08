import { ThemeColor } from "@/lib/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemesState = {
  selectedTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;

  customs: ThemeColor[];
  addCustomTheme: (theme: ThemeColor) => void;
  removeCustomTheme: (theme: ThemeColor) => void;
}

export const useThemesStore = create(
  persist<ThemesState>(
    (set) => ({
      selectedTheme: { name: "Default", colors: ["#FFFFFF", "#000000", "#000000"], id: "default", eyeRadius: 0, qrStyle: "squares" },
      setTheme: (theme) => set({ selectedTheme: theme }),

      customs: [],
      addCustomTheme: (theme) => set((state) => ({ customs: [...state.customs, theme] })),
      removeCustomTheme: (theme) => set((state) => ({ customs: state.customs.filter((t) => t !== theme) })),
    }),
    {
      name: "themes",
    }
  )
)