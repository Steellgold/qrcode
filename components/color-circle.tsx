"use client";

import { ThemeColor } from "@/lib/theme";
import { Button } from "./ui/button";
import { Component } from "./ui/component";
import { cn } from "@/lib/utils";

type ColorCircleProps = {
  theme: ThemeColor;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorCircle: Component<ColorCircleProps> = ({ theme, isSelected, onClick }) => (
  <Button
    key={theme.name}
    variant="outline"
    className={cn("w-10 h-10 p-0 rounded-full overflow-hidden relative", {
      "ring-2 ring-primary": isSelected,
    })}
    title={theme.name}
    onClick={onClick}
  >
    {theme.colors.map((color: string, index: number) => {
      const rotation = (index / theme.colors.length) * 360;
      const skew = (1 / theme.colors.length) * 360;
      return (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            transform: `rotate(${rotation}deg) skew(${skew}deg)`,
            transformOrigin: '50% 50%',
            borderColor: theme.colors[(index + 1) % theme.colors.length]
          }}
        />
      );
    })}
  </Button>
);