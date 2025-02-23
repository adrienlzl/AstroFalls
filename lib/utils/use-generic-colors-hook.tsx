import { useState, useEffect } from "react";

import "@/app/generic-colors.scss";


export function useGenericColorsHook() {
  const [colorMeteoriteType, setColorMeteoriteType] = useState<Record<string, string>>({
    Iron: "#ff7f0e",
    Stone: "#1f77b4",
    "Stony-Iron": "#2ca02c",
    "Sans Type": "#000000",
  });

  const [accentColor, setAccentColor] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      const rootStyles = getComputedStyle(document.documentElement);

      setAccentColor(rootStyles.getPropertyValue("--accent-color").trim());

      setColorMeteoriteType({
        Iron: rootStyles.getPropertyValue("--meteorite-type-iron").trim(),
        Stone: rootStyles.getPropertyValue("--meteorite-type-stone").trim(),
        "Stony-Iron": rootStyles.getPropertyValue("--meteorite-type-stony-iron").trim(),
        "Sans Type": rootStyles.getPropertyValue("--meteorite-type-null").trim(),
      });
    }, 100);
  }, []);

  return { accentColor, colorMeteoriteType };
}
