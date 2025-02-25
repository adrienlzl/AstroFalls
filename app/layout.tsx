import "@/styles/tailwind.css";
import "@/styles/global.scss";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Astro Fall",
  authors: [{ name: "Adrien Lazaille, Camille Hoareau, Corentin Beyries et Emmanuel Lefevre" }],
  keywords: ["NextJS", " Tailwind", " MongoDB", "Scss", "TurboPack"],
  description: "Explorez les chutes de météorites à travers le monde grâce à une visualisation interactive. Analysez les données géographiques, temporelles et caractéristiques des météorites avec des graphiques, tableaux et des données clés"
};

export const viewport = {
  themeColor: "#02afac"
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr">
      <body>
        <div id="body-container">
          {children}
        </div>
      </body>
    </html>
  );
}
