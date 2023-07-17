import {
    ThirdwebProvider,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    paperWallet,
    magicLink,
    safeWallet,
} from "@thirdweb-dev/react";

import type { AppProps } from "next/app";
import { configureChains, useAccount, WagmiConfig } from "wagmi";
import { createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { optimismGoerli, polygonMumbai } from "@wagmi/core/chains";
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
import { InjectedConnector } from "wagmi/connectors/injected";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
    [optimismGoerli, polygonMumbai],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "masterwave",
    chains,
    projectId: "1",
});

const wagmiClient = createClient({
    connectors,
    autoConnect: true,
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
                        <ThirdwebProvider
                            activeChain={"mumbai"}
                            supportedWallets={[
                                metamaskWallet(),
                                coinbaseWallet(),
                                safeWallet(),
                                magicLink({
                                    apiKey: "pk_live_E7F10A72861EC99E",
                                }),
                            ]}
                        >
                            <InitHooks setTheme={_setTheme} />
                            <Component {...pageProps} />
                            <ToastContainer draggable theme={_theme} />
                        </ThirdwebProvider>
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
