import { useEffect } from "react";
import { useStudy } from "@/lib/store";

export function ThemeSync() {
  const theme = useStudy((s) => s.theme);
  const fontScale = useStudy((s) => s.fontScale);
  const reduceMotion = useStudy((s) => s.reduceMotion);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.font = fontScale;
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [theme, fontScale, reduceMotion]);
  return null;
}
