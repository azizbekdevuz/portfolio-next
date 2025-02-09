import { Open_Sans, Raleway, Poppins } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const fonts = `${openSans.variable} ${raleway.variable} ${poppins.variable}`;
