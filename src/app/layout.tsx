import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/style/globals.css";
import { cn } from "@/lib/utils";
import Protected from "@/layout/protected";
import CustomSessionProvider from "@/layout/session";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "insight delivered",
  description: "Qlik sense api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen overflow-hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <CustomSessionProvider>
          <Protected>{children}</Protected>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
