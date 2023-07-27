import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import {
    connectorsForWallets,
    lightTheme,
    RainbowKitProvider,
    Theme,
} from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import type { AppProps } from "next/app";
import { configureChains, WagmiConfig } from "wagmi";
import { createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
    goerli,
    mainnet,
    polygon,
    optimismGoerli,
    polygonMumbai,
} from "@wagmi/chains";
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
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "components";
import { rainbowWeb3AuthConnector } from "../RainbowWeb3authConnector";
import {
    walletConnectWallet,
    rainbowWallet,
    metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const queryClient = new QueryClient();

// const { chains, provider, webSocketProvider } = configureChains(
//     [optimismGoerli, polygonMumbai, goerli],
//     [
//         alchemyProvider({ apiKey: "nFTET_K-74PpUAM40EC_9Lx3C8SMn1sW" }),
//         infuraProvider({ apiKey: "5d95dcb59ef5442c9f75d1ede157a088" }),
//         publicProvider(),
//     ]
// );

const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon, goerli],
    [
        alchemyProvider({ apiKey: "7wSu45FYTMHUO4HJkHjQwX4HFkb7k9Ui" }),
        alchemyProvider({ apiKey: "fGXusgBUDC-OPy6XI8IFRvu1i7sbWsYj" }),
        publicProvider(),
    ]
);
// const { connectors } = getDefaultWallets({
//     appName: "Masterwave",
//     chains,
// });

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            rainbowWallet({
                chains,
                projectId: "0fb24e44681391b35c39748bba4ed484",
            }),
            walletConnectWallet({
                chains,
                projectId: "0fb24e44681391b35c39748bba4ed484",
            }),
            metaMaskWallet({
                chains,
                projectId: "0fb24e44681391b35c39748bba4ed484",
            }),
            rainbowWeb3AuthConnector({
                chains,
                projectId: "0fb24e44681391b35c39748bba4ed484",
            }),
        ],
    },
]);

// tüm wallet fonksiyonları bu connectorda bitiyor

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

function masterwaveApp({ Component, pageProps }: AppProps) {
    const [_theme, _setTheme] = useState<ThemeOption>("dark");
    const activeChain = "goerli";
    const myTheme = merge(lightTheme(), {
        colors: {
            accentColor: "#2563eb",
        },
    } as Theme);

    return (
        <QueryClientProvider client={queryClient}>
            <ClientOnly>
                <RecoilRoot>
                    <WagmiConfig client={wagmiClient}>
                        <RainbowKitProvider
                            showRecentTransactions
                            chains={chains}
                            initialChain={5}
                            theme={myTheme}
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
