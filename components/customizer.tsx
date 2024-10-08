"use client";

import { ReactElement, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Square, Squircle, Circle, Dot, Droplet, Grid2X2, Dices, Copy, Shuffle, ImageDown, History, Globe, Palette, Bookmark } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type ThemeColor = {
  name: string;
  colors: string[];
  eyeRadius?: number;
  qrStyle?: "squares" | "dots" | "fluid";
}

const themes: ThemeColor[] = [
  { name: "Default", colors: ["#FFFFFF", "#000000", "#000000"] },
  { name: "Inverted Default", colors: ["#000000", "#FFFFFF", "#FFFFFF"] },
  { name: "Night", colors: ["#000000", "#070d24", "#0e123a"] },
  { name: "Blood", colors: ["#2c0404", "#dd2727", "#b33030"] },
  { name: "Sunset", colors: ["#f7b733", "#fc4a1a", "#d81159"] },
  { name: "Sky", colors: ["#0f2027", "#203a43", "#2c5364"] },
  { name: "Water", colors: ["#06042c", "#283ade", "#3041b3"] },
  { name: "Forest", colors: ["#0b6623", "#388e3c", "#4caf50"] },
  { name: "Lion", colors: ["#3e2b2b", "#b5651d", "#d9a566"] },
  { name: "Fire", colors: ["#ff0000", "#ff7f00", "#ffbf00"] },
  { name: "Metal", colors: ["#3a3a3a", "#7a7a7a", "#b5b5b5"] },
  { name: "Space", colors: ["#000000", "#1c1c1c", "#383838"] },
  { name: "Galaxy", colors: ["#1c1b33", "#5c33ff", "#7e57c2"] },
  { name: "Aurora", colors: ["#00ffcc", "#9933ff", "#cc00ff"] },
  { name: "Moonlight", colors: ["#333333", "#cccccc", "#b0c4de"] },
  { name: "Shadow", colors: ["#1c1c1c", "#3b3b3b", "#5e5e5e"] },
  { name: "Ocean Breeze", colors: ["#004f6e", "#00a0b0", "#00d9d2"] },
  { name: "Sunrise", colors: ["#ffdd00", "#ff7300", "#ff4e00"] },
  { name: "Emerald", colors: ["#054d44", "#1abc9c", "#16a085"] },
  { name: "Berry", colors: ["#4b0f1f", "#9b1d39", "#d94e7b"] },
  { name: "Rust", colors: ["#4e1a1a", "#8b3e2f", "#d07f55"] },
  { name: "Lavender", colors: ["#b19cd9", "#9370db", "#7b68ee"] },
  { name: "Mint", colors: ["#98ff98", "#3eb489", "#2e8b57"] },
  { name: "Canyon", colors: ["#8c3f1f", "#d2691e", "#f4a460"] },
  { name: "Cobalt", colors: ["#002366", "#0047ab", "#4682b4"] },
  { name: "Peach", colors: ["#ffe5b4", "#ffad60", "#ff7f50"] },
  { name: "Frost", colors: ["#e0f7fa", "#81d4fa", "#4fc3f7"] },
  { name: "Mystic", colors: ["#2b1b17", "#6e3b3b", "#b57281"] },
  { name: "Autumn", colors: ["#4b2e0f", "#8b4513", "#c46210"] },
  { name: "Dusk", colors: ["#3e1d45", "#6b0f74", "#aa2b94"] },
  { name: "Cedar", colors: ["#4a2f27", "#a0522d", "#c08060"] },
  { name: "Tropic", colors: ["#006d5b", "#00a693", "#66b2a7"] },
  { name: "Brick", colors: ["#7c0a02", "#9b4d46", "#ad6e5b"] },
  { name: "Pine", colors: ["#204c34", "#38755b", "#6a9975"] },
  { name: "Blossom", colors: ["#e75480", "#f88379", "#f4a3a8"] },
  { name: "Slate", colors: ["#3b444b", "#5a6978", "#778899"] },
  { name: "Clay", colors: ["#836953", "#a57c65", "#b98d7f"] },
  { name: "Twilight", colors: ["#4a536b", "#6a5acd", "#9370db"] },
  { name: "Storm", colors: ["#5b5b5b", "#737373", "#9e9e9e"] },
  { name: "Teal", colors: ["#008080", "#20b2aa", "#40e0d0"] },
  { name: "Saffron", colors: ["#b5651d", "#ffb300", "#d87b1e"] },
  { name: "Berry Crush", colors: ["#7b1fa2", "#ab47bc", "#ce93d8"] },
  { name: "Meadow", colors: ["#3a5f0b", "#6b8e23", "#9acd32"] },
  { name: "Bronze", colors: ["#8c4b0f", "#b87333", "#cd853f"] },
  { name: "Cypress", colors: ["#2f4f4f", "#4b636e", "#708090"] },
  { name: "Periwinkle", colors: ["#ccccff", "#b39ddb", "#9575cd"] },
  { name: "Forest Berry", colors: ["#4b3f72", "#654e92", "#8b6fae"] },
  { name: "Velvet", colors: ["#5c0923", "#7b1034", "#9e1d4d"] },
  { name: "Obsidian", colors: ["#1c1c1c", "#2b2b2b", "#4a4a4a"] }
];

export const Customizer = (): ReactElement => {
  const [selectedTheme, setTheme] = useState(themes[0]);
  const [history, setHistory] = useState<ThemeColor[]>([themes[0]]);

  const [eyeRadius, setEyeRadius] = useState(0);
  const [qrStyle, setQRStyle] = useState<"squares" | "dots" | "fluid">("squares");

  const [destUrl, setDestUrl] = useState("https://steellgold.fr");
  const [qrUrl, setQRUrl] = useState("https://qr-color.vercel.app");

  const handleRandomTheme = () => {
    const theme = themes[Math.floor(Math.random() * themes.length)];

    setTheme(theme);
    setEyeRadius(theme.eyeRadius ?? eyeRadius);
    setQRStyle(theme.qrStyle ?? qrStyle);

    buildQRUrl();
    addThemeToHistory({ name: "Custom", colors: theme.colors, eyeRadius: theme.eyeRadius, qrStyle: theme.qrStyle });
  }

  const handleRandomThemeCustom = () => {
    const bgColor = themes[Math.floor(Math.random() * themes.length)].colors[0];
    const fgColor = themes[Math.floor(Math.random() * themes.length)].colors[1];
    const eyeColor = themes[Math.floor(Math.random() * themes.length)].colors[2];

    const eyeRadius = [0, 10, 20][Math.floor(Math.random() * 3)];
    const qrStyle = ["squares", "dots", "fluid"][Math.floor(Math.random() * 3)] as "squares" | "dots" | "fluid";

    setTheme({ name: "Custom", colors: [bgColor, fgColor, eyeColor] });
    setEyeRadius(eyeRadius);
    setQRStyle(qrStyle);

    buildQRUrl();
    addThemeToHistory({ name: "Custom", colors: [bgColor, fgColor, eyeColor], eyeRadius, qrStyle });
  }

  const addThemeToHistory = (theme: ThemeColor) => {
    if (history[history.length - 1] !== theme) {
      setHistory([...history, theme]);
    }
  }

  const setThemeFromHistory = (index: number) => {
    setTheme(history[index]);
    setEyeRadius(history[index].eyeRadius ?? eyeRadius);
    setQRStyle(history[index].qrStyle ?? qrStyle);
    setHistory(history.slice(0, index + 1));
  }

  const buildQRUrl = () => {
    let url = "https://qr-color.vercel.app";
    url += `?url=${destUrl}`;
    if (selectedTheme.name !== "Default") url += `&theme=${selectedTheme.name}`;
    if (eyeRadius !== 0) url += `&eyeRadius=${eyeRadius}`;
    if (qrStyle !== "squares") url += `&qrStyle=${qrStyle}`;
    setQRUrl(url);
  }

  const copyImage = async () => {
    const canvas = document.getElementById("qr-code-component") as HTMLCanvasElement | null;
  
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();
  
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
  
        toast.success("Your QR code has been copied to the clipboard");
      } catch (err) {
        console.error(err);
        toast.error("Failed to copy QR code to clipboard");
      }
    }
  };

  const downloadImage = () => {
    const canvas = document.getElementById("qr-code-component") as HTMLCanvasElement | null;

    if(canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl
      downloadLink.download = `your_name.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  return (
    <div className="bg-primary/5 p-5 flex flex-col gap-5 border-2 border-primary/10 rounded-lg shadow-lg">
      <div className="text-left sm:text-center">
        <p className="text-lg font-medium">Customize your QR code</p>
        <p className="text-sm text-muted-foreground">Select a theme to customize the QR code.</p>
      </div>

      <div className="sm:w-[515px] flex flex-col gap-2">
        <label htmlFor="destUrl" className="text-sm text-muted-foreground">Destination URL</label>
        <Input id="destUrl" value={destUrl} onChange={(e) => setDestUrl(e.target.value)} />
      </div>

      <div className="flex flex-col sm:flex-row sm:w-[515px] sm:mx-auto gap-3">
        <div className="bg-primary/10 p-3 rounded-lg shadow-lg flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <QRCode
                value={destUrl}
                size={128}
                bgColor={selectedTheme.colors[0]}
                fgColor={selectedTheme.colors[1]}

                eyeColor={selectedTheme.colors[2]}
                eyeRadius={selectedTheme.eyeRadius ?? eyeRadius}
                qrStyle={selectedTheme.qrStyle ?? qrStyle}

                id="qr-code-component"
              />

              <p className="text-sm text-center text-muted-foreground font-bold">{selectedTheme.name}</p>
            </div>

            <div className="flex flex-row justify-center gap-0.5">
              <Button variant="outline" size="icon" onClick={() => setEyeRadius(0)} disabled={eyeRadius === 0}>
                <Square className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setEyeRadius(10)} disabled={eyeRadius === 10}>
                <Squircle className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setEyeRadius(20)} disabled={eyeRadius === 20}>
                <Circle className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-0.5">
              <Button variant="outline" size="icon" onClick={() => setQRStyle("squares")} disabled={qrStyle === "squares"}>
                <Grid2X2 className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setQRStyle("dots")} disabled={qrStyle === "dots"}>
                <Dot className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={() => setQRStyle("fluid")} disabled={qrStyle === "fluid"}>
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
              <Button variant="outline" size="icon" onClick={() => copyImage()}>
                <Copy className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={() => downloadImage()}>
                <ImageDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="default" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <div className="flex flex-wrap gap-2 justify-center">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  className={cn("w-10 h-10 p-0 rounded-full overflow-hidden relative", {
                    "ring-2 ring-primary": selectedTheme.name === theme.name
                  })}
                  title={theme.name}
                  onClick={() => {
                    setTheme(theme);
                    buildQRUrl();
                  }}
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
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom" className="h-64">
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <Palette size={30} className="text-primary" />
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="explore" className="h-64">
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <Globe size={30} className="text-primary" />
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="h-64">
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <Bookmark size={30} className="text-primary" />
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}