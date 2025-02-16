import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Astro Falls",
  authors: [{ name: "Adrien Lazaille, Camille Hoareau, Corentin Beyries et Emmanuel Lefevre" }],
  keywords: ["NextJS", " Tailwind", " MongoDB"],
  description: "Explorez les chutes de météorites à travers le monde grâce à une visualisation interactive. Analysez les données géographiques, temporelles et caractéristiques des météorites avec des graphiques, tableau et des données clés"
};

export const viewport = {
  themeColor: "#95cb11"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
