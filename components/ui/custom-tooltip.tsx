import React from "react";
import { useGenericColorsHook } from "@/lib/utils/use-generic-colors-hook";


interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  cursorStyle?: React.CSSProperties;
  labelText?: string;
  formatter?: (value: number) => string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  cursorStyle,
  labelText = "Chutes : ",
  formatter = (value) => value.toLocaleString()
}) => {
  const { primaryColor, secondaryColor, accentColor } = useGenericColorsHook();

  if (active && payload && payload.length) {
    const formattedValue = `${formatter(payload[0].value)}`;

    return (
      <div style={{ background: "white", padding: "8px", ...cursorStyle }}>
        <p style={{ color: accentColor, fontWeight: "bold" }}>{ label }</p>
        <p style={{ color: secondaryColor }}>{ labelText }
          <span style={{ color: primaryColor }}>{ formattedValue }</span>
        </p>
      </div>
    );
  }
  return null;
};
