import { useState, useEffect } from "react";

import "@/styles/hook/generic-colors.scss";


export function useGenericColorsHook() {
  const [colorMeteoriteType, setColorMeteoriteType] = useState<Record<string, string>>({
    Iron: "#ff7f0e",
    Stone: "#1f77b4",
    "Stony-Iron": "#2ca02c",
    "Sans Type": "#383838",
  });

  const [accentColor, setAccentColor] = useState<string>("#6e02c7");

  const [primaryColor, setPrimaryColor] = useState<string>("#02afac");

  const [secondaryColor, setSecondaryColor] = useState<string>("#226A90");

  const [rodColor, setColorRod] = useState<string>("#02afac");

  useEffect(() => {
    setTimeout(() => {
      const rootStyles = getComputedStyle(document.documentElement);

      setAccentColor(rootStyles.getPropertyValue("--accent-color").trim());
      setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
      setSecondaryColor(rootStyles.getPropertyValue("--secondary-color").trim());

      setColorRod(rootStyles.getPropertyValue("--rod-color").trim());

      setColorMeteoriteType({
        Iron: rootStyles.getPropertyValue("--meteorite-type-iron").trim(),
        Stone: rootStyles.getPropertyValue("--meteorite-type-stone").trim(),
        "Stony-Iron": rootStyles.getPropertyValue("--meteorite-type-stony-iron").trim(),
        "Sans Type": rootStyles.getPropertyValue("--meteorite-type-null").trim(),
      });

    }, 100);
  }, []);

  return { accentColor, colorMeteoriteType, primaryColor, rodColor, secondaryColor };
}
