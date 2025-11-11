import { Nunito_Sans, Poppins } from "next/font/google";

export const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const poppins = Poppins({
  subsets: ["latin"],
  style: "normal",
  weight: "600",
});
