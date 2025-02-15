import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Astro Falls",
  description: "Explorez les chutes de météorites à travers le monde grâce à une visualisation interactive. Analysez les données géographiques, temporelles et caractéristiques des météorites avec des graphiques, tableau et des données clés",
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
