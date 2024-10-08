import { Button } from "./ui/button"
import { Circle, Copy, Dices, Dot, Droplet, Grid2X2, History, ImageDown, Shuffle, Square, Squircle, Trash } from "lucide-react"
import { ThemeSwitcher } from "./ui/theme-switcher"
import { Component } from "./ui/component"
import { EyeRadius, QRStyle, ThemeColor } from "@/lib/theme"

type PanelProps = {
  eyeRadius: EyeRadius;
  setEyeRadius: (radius: EyeRadius) => void;

  qrStyle: QRStyle;
  setQRStyle: (style: QRStyle) => void;

  handleRandomTheme: () => void;
  handleRandomThemeCustom: () => void;

  history: ThemeColor[];
  setThemeFromHistory: (index: number) => void;

  copyImage: () => void;
  downloadImage: () => void;

  tab: "default" | "custom" | "explore" | "favorites";

  selectedTheme: ThemeColor;
  handleDeleteCustomTheme: () => void;
  handleResetTheme: () => void;
}

export const Panel: Component<PanelProps> = ({
  eyeRadius, setEyeRadius, qrStyle, setQRStyle,
  handleRandomTheme, handleRandomThemeCustom,
  history, setThemeFromHistory,
  copyImage, downloadImage,
  tab,
  selectedTheme, handleDeleteCustomTheme
}) => {
  return <>
    <div className="flex flex-row justify-center gap-0.5">
      <Button variant="outline" size="icon" onClick={() => setEyeRadius(0)} disabled={eyeRadius === 0 || tab == "custom"}>
        <Square className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setEyeRadius(10)} disabled={eyeRadius === 10 || tab == "custom"}>
        <Squircle className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setEyeRadius(20)} disabled={eyeRadius === 20 || tab == "custom"}>
        <Circle className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex flex-row justify-center gap-0.5">
      <Button variant="outline" size="icon" onClick={() => setQRStyle("squares")} disabled={qrStyle === "squares" || tab == "custom"}>
        <Grid2X2 className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setQRStyle("dots")} disabled={qrStyle === "dots" || tab == "custom"}>
        <Dot className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setQRStyle("fluid")} disabled={qrStyle === "fluid" || tab == "custom"}>
        <Droplet className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex flex-row justify-center gap-0.5">
      <Button variant="outline" size="icon" onClick={handleRandomTheme}>
        <Dices className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={handleRandomThemeCustom}>
        <Shuffle className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => setThemeFromHistory(history.length - 2)} disabled={history.length < 2}>
        <History className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex flex-row justify-center gap-0.5">
      <ThemeSwitcher />
      
      <Button variant="outline" size="icon" onClick={() => copyImage()}>
        <Copy className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" onClick={() => downloadImage()}>
        <ImageDown className="h-4 w-4" />
      </Button>
    </div>

    {selectedTheme && selectedTheme.isCustom && (
      <div className="flex flex-row justify-center gap-0.5">
        <Button variant="destructive" size="icon" onClick={handleDeleteCustomTheme}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )}
  </>
}