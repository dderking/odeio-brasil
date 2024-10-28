import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Providers } from "./Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Fatos sobre Corrupção no Brasil",
  description: "Aprenda fatos sobre corrupção no Brasil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
