import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers/providers";

export const metadata: Metadata = { title: "Task Scheduler Simulator" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
