import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@config/fonts";
import {useRouter} from 'next/router';
import { AppProvider } from "@context/AppContext";
import "@styles/globals.css";
require('dotenv').config();

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
  
	return (
	  <NextUIProvider navigate={router.push}>
		  <NextThemesProvider>
			<AppProvider>
			  <Component {...pageProps} />
			</AppProvider>
		  </NextThemesProvider>
	  </NextUIProvider>
	);
  }

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};