import { ThemeProvider } from "@/components/theme-provider";
import { nunito } from "./fonts";
import { Toaster } from "@/components/toaster";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { NextAuthProvider } from "@/lib/sessionProvider";
import "@/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-white">
      <head />
      <body
        className={cn("h-full " + nunito.className)}
        suppressHydrationWarning
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
