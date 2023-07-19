import { useReducer } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
    darkTheme,
    getDefaultWallets,
    lightTheme,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import { configureChains, WagmiConfig } from "wagmi";
import { createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli, optimismGoerli, polygonMumbai } from "@wagmi/core/chains";
import "styles/globals.scss";
import { RecoilRoot } from "recoil";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { ThemeOption } from "recoil/theme/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { scroll } from "consts/chains";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "components";

export const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
    [optimismGoerli, polygonMumbai, goerli],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "masterwave",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

function masterwaveApp({ Component, pageProps }: AppProps) {
    const [_theme, _setTheme] = useState<ThemeOption>("dark");

    return (
        <QueryClientProvider client={queryClient}>
            <ClientOnly>
                <RecoilRoot>
                    <WagmiConfig client={wagmiClient}>
                        <RainbowKitProvider
                            showRecentTransactions
                            chains={chains}
                            initialChain={80001}
                            theme={
                                _theme === "dark" ? darkTheme() : lightTheme()
                            }
                        >
                            <InitHooks setTheme={_setTheme} />
                            <Component {...pageProps} />
                            <ToastContainer draggable theme={_theme} />
                        </RainbowKitProvider>
                    </WagmiConfig>
                </RecoilRoot>
            </ClientOnly>
        </QueryClientProvider>
    );
}

function ClientOnly({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
                <Header />
            </>
        );
    }

    return <>{children}</>;
}

function InitHooks({
    setTheme,
}: {
    setTheme: Dispatch<SetStateAction<ThemeOption>>;
}) {
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return null;
}

export default masterwaveApp;
