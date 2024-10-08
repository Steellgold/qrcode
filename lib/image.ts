import { toast } from "sonner";

export const copyImage = async () => {
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

export const downloadImage = () => {
  const canvas = document.getElementById("qr-code-component") as HTMLCanvasElement | null;
  if (canvas) {
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};