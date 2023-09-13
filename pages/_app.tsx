import type { AppProps } from "next/app";
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, safeWallet, trustWallet, zerionWallet, frameWallet, rainbowWallet,} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
    <ThirdwebProvider
    clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet(),
      walletConnect(),
      safeWallet({
        personalWallets: [
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect(),
        ],
      }),
      trustWallet(),
      zerionWallet(),
      frameWallet(),
      rainbowWallet(),
    ]}
    dAppMeta={{
      name: "Peaq Market",
      description: "The voice to your web data",
      logoUrl: "images/logo.png",
      url: "https://peaqmarket.xyz",
      isDarkMode: true,
    }}
  >
      <Component {...pageProps} />
    </ThirdwebProvider>
    </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
