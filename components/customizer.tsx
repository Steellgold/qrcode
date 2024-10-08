"use client";

import { ReactElement, useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "./ui/button";
import { Square, Squircle, Circle, Dot, Droplet, Grid2X2, Globe, Palette, Bookmark } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { HexColorPicker } from "react-colorful";
import { useThemesStore } from "./store/use-themes";
import { EyeRadius, QRStyle, TabType, ThemeColor, themes } from "@/lib/theme";
import { Panel } from "./panel";
import { ColorCircle } from "./color-circle";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";

export const Customizer = (): ReactElement => {
  const { setTheme, selectedTheme, customs, addCustomTheme, removeCustomTheme } = useThemesStore();
  const [history, setHistory] = useState<ThemeColor[]>([themes[0]]);

  const [eyeRadius, setEyeRadius] = useState<EyeRadius>(0);
  const [qrStyle, setQRStyle] = useState<QRStyle>("squares");

  const [centerImage, setCenterImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<number>(0);
  const [removeBgImage, setRemoveBgImage] = useState<boolean>(true);

  const [content, setContent] = useState("https://qr-color.vercel.app/");

  const [tab, setTab] = useState<TabType>("default");
  const [custom, setCustom] = useState<ThemeColor>({ name: "Custom", colors: ["#FFFFFF", "#000000", "#000000"], id: "Custom", eyeRadius: 0, qrStyle: "squares" });

  const handleRandomTheme = () => {
    const theme = themes[Math.floor(Math.random() * themes.length)];
    
    setTheme(theme);
    setEyeRadius(theme.eyeRadius);
    setQRStyle(theme.qrStyle);
    addThemeToHistory({ name: "Custom", colors: theme.colors, eyeRadius: theme.eyeRadius, qrStyle: theme.qrStyle, id: "Custom" });
  }

  const handleRandomThemeCustom = () => {
    const bgColor = themes[Math.floor(Math.random() * themes.length)].colors[0];
    const fgColor = themes[Math.floor(Math.random() * themes.length)].colors[1];
    const eyeColor = themes[Math.floor(Math.random() * themes.length)].colors[2];

    const eyeRadius = [0, 10, 20][Math.floor(Math.random() * 3)] as EyeRadius;
    const qrStyle = ["squares", "dots", "fluid"][Math.floor(Math.random() * 3)] as QRStyle;

    setTheme({ name: "Custom", colors: [bgColor, fgColor, eyeColor], id: "Custom", eyeRadius, qrStyle });
    setEyeRadius(eyeRadius);
    setQRStyle(qrStyle);
    
    addThemeToHistory({ name: "Custom", colors: [bgColor, fgColor, eyeColor], eyeRadius, qrStyle, id: "Custom" });
  }

  const addThemeToHistory = (theme: ThemeColor) => {
    if (history[history.length - 1] !== theme) {
      setHistory([...history, theme]);
    }
  }

  const setThemeFromHistory = (index: number) => {
    setTheme(history[index]);
    setEyeRadius(history[index].eyeRadius);
    setQRStyle(history[index].qrStyle);
    setHistory(history.slice(0, index + 1));
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
      downloadLink.download = `qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get("content");

    if(content) {
      setContent(content);
      toast.success("Content loaded from URL query parameter");
    }
  }, []);

  return (
    <div className="bg-primary/5 p-5 flex flex-col gap-5 border-2 border-primary/10 rounded-lg shadow-lg">
      <div className="text-center">
        <p className="text-lg font-medium">Customize your QR code</p>
        <p className="text-sm text-muted-foreground">Select a theme to customize the QR code.</p>
      </div>

      <div className="sm:w-[515px] flex flex-col gap-2">
        <label htmlFor="destUrl" className="text-sm text-muted-foreground">Content</label>
        <Input id="destUrl" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>

      <div className="flex flex-col sm:flex-row sm:w-[515px] sm:mx-auto gap-3">
        <div className="bg-primary/10 p-3 rounded-lg shadow-lg flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <QRCode
                value={content} size={128}
                bgColor={selectedTheme.colors[0]}
                fgColor={selectedTheme.colors[1]}
                eyeColor={selectedTheme.colors[2]}
                eyeRadius={eyeRadius}
                qrStyle={qrStyle}

                logoHeight={imageSize}
                logoWidth={imageSize}
                logoImage={centerImage ?? ""}
                removeQrCodeBehindLogo={removeBgImage}

                id="qr-code-component"
              />
              <p className="text-sm text-center text-muted-foreground font-normal">{selectedTheme.name}</p>
            </div>

            <Panel
              eyeRadius={eyeRadius}
              setEyeRadius={setEyeRadius}
              qrStyle={qrStyle}
              setQRStyle={setQRStyle}
              history={history}
              tab={tab}
              selectedTheme={selectedTheme}

              handleRandomTheme={handleRandomTheme}
              
              handleResetTheme={() => setTheme(themes[0])}
              handleRandomThemeCustom={handleRandomThemeCustom}
              handleDeleteCustomTheme={() => {
                removeCustomTheme(selectedTheme);
                setTheme(themes[0]);
              }}
              
              setThemeFromHistory={setThemeFromHistory}

              copyImage={copyImage}
              downloadImage={downloadImage}
            />
          </div>
        </div>

        <Tabs defaultValue="custom" className="w-full" onValueChange={(value) => setTab(value as TabType)}>
          <TabsList className="w-full">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {themes.map((theme) => (
                <ColorCircle
                  key={theme.id}
                  isSelected={selectedTheme.id === theme.id}
                  theme={theme}
                  onClick={() => {
                    setTheme(theme);
                    setEyeRadius(theme.eyeRadius ?? eyeRadius);
                    setQRStyle(theme.qrStyle ?? qrStyle);
                    addThemeToHistory(theme);
                  }}
                />
              ))}
            </div>

            {customs.length > 0 && <>
              <p className="text-sm text-muted-foreground mt-2">Custom themes ({customs.length})</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                {customs.map((theme) => (
                  <ColorCircle
                    key={theme.id}
                    isSelected={selectedTheme.id === theme.id}
                    theme={theme}
                    onClick={() => {
                      setTheme(theme);
                      setEyeRadius(theme.eyeRadius ?? eyeRadius);
                      setQRStyle(theme.qrStyle ?? qrStyle);
                      addThemeToHistory(theme);
                    }}
                  />
                ))}
              </div>
            </>}
          </TabsContent>
          <TabsContent value="custom">
            <Accordion type="single" collapsible defaultValue="item-5">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Background
                </AccordionTrigger>
                <AccordionContent className="flex justify-center">
                  <div className="flex flex-col">
                    <HexColorPicker
                      color={selectedTheme.colors[0]}
                      onChange={(color) => {
                        setCustom({ ...custom, colors: [color, custom.colors[1], custom.colors[2]] });
                        setTheme({ ...selectedTheme, colors: [color, selectedTheme.colors[1], selectedTheme.colors[2]] });
                      }}
                    />
                    
                    <div className="flex items-center gap-1 flex-row">
                      <Input
                        value={selectedTheme.colors[0]}
                        className="w-full border-2 rounded-md p-1 text-sm"
                        onChange={(e) => {
                          setCustom({ ...custom, colors: [e.target.value, custom.colors[1], custom.colors[2]] });
                          setTheme({ ...selectedTheme, colors: [e.target.value, selectedTheme.colors[1], selectedTheme.colors[2]] });
                        }}
                        style={{ borderColor: selectedTheme.colors[0] }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Foreground
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-center">
                    <div className="flex flex-col">
                      <HexColorPicker
                        color={selectedTheme.colors[1]}
                        onChange={(color) => {
                          setCustom({ ...custom, colors: [custom.colors[0], color, custom.colors[2]] });
                          setTheme({ ...selectedTheme, colors: [selectedTheme.colors[0], color, selectedTheme.colors[2]] });
                        }}
                      />
                      
                      <div className="flex items-center gap-1 flex-row">
                        <Input
                          value={selectedTheme.colors[1]}
                          className="w-full border-2 rounded-md p-1 text-sm"
                          onChange={(e) => {
                            setCustom({ ...custom, colors: [custom.colors[0], e.target.value, custom.colors[2]] });
                            setTheme({ ...selectedTheme, colors: [selectedTheme.colors[0], e.target.value, selectedTheme.colors[2]] });
                          }}
                          style={{ borderColor: selectedTheme.colors[1] }}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Corners
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-center">
                    <div className="flex flex-col">
                      <HexColorPicker
                        color={selectedTheme.colors[2]}
                        onChange={(color) => {
                          setCustom({ ...custom, colors: [custom.colors[0], custom.colors[1], color] });
                          setTheme({ ...selectedTheme, colors: [selectedTheme.colors[0], selectedTheme.colors[1], color] });
                        }}
                      />

                      <div className="flex items-center gap-1 flex-row">
                        <Input
                          value={selectedTheme.colors[2]}
                          className="w-full border-2 rounded-md p-1 text-sm"
                          onChange={(e) => {
                            setCustom({ ...custom, colors: [custom.colors[0], custom.colors[1], e.target.value] });
                            setTheme({ ...selectedTheme, colors: [selectedTheme.colors[0], selectedTheme.colors[1], e.target.value] });
                          }}
                          style={{ borderColor: selectedTheme.colors[2] }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center gap-0.5 mt-3">
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Style
                </AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Image
                </AccordionTrigger>
                <AccordionContent>
                  <input type="file" accept="image/png" id="file" style={{ display: "none" }} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setCenterImage(e.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} />

                  <div className="flex flex-row gap-2">
                    <Button variant="outline" onClick={() => document.getElementById("file")?.click()}>
                      Upload Image
                    </Button>

                    <Button variant="outline" onClick={() => setCenterImage(null)} disabled={!centerImage}>
                      Remove Image
                    </Button>
                  </div>

                  <div className="gap-2 mt-4">
                    <Label>Select image size</Label>
                    <Slider
                      id="imageSize"
                      defaultValue={[32]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={(value) => setImageSize(value[0])}
                    />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    {/* @ts-ignore */}
                    <Checkbox id="rmbg" checked={removeBgImage} onCheckedChange={(checked) => setRemoveBgImage(checked)} />
                    <Label htmlFor="rmbg" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Remove QR code behind logo
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-row items-center gap-2 mt-3">
              <Input
                value={custom.name}
                onChange={(e) => setCustom({ ...custom, name: e.target.value })}
                className="w-full border-2 rounded-md p-1 text-sm"
              />

              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => {
                  addCustomTheme({
                    name: custom.name,
                    colors: custom.colors,
                    eyeRadius: eyeRadius,
                    qrStyle: qrStyle,
                    id: Math.random().toString(36).substring(7),
                    isCustom: true
                  })

                  toast.success("Custom theme saved successfully!");
                }}
                disabled={customs.some((theme) => theme.name === custom.name)}
              >
                <Palette className="h-4 w-4 mr-1" />
                Save Theme
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2">Saved themes saved to local storage and displayed in the &quot;Default&quot; tab.</p>

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