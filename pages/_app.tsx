import { useReducer } from "react";
import {
    DispatchPlayerContext,
    PlayerContext,
    playerInitialState,
    playerReducer,
} from "decent-audio-player";
import "@rainbow-me/rainbowkit/styles.css";
import {
    darkTheme,
    getDefaultWallets,
    lightTheme,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
    configureChains,
    createClient,
    goerli,
    useAccount,
    WagmiConfig,
} from "wagmi";
import { optimismGoerli } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
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
    [optimismGoerli],
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
    const [state, dispatch] = useReducer(playerReducer, playerInitialState);
    const [_theme, _setTheme] = useState<ThemeOption>("dark");

    return (
        <PlayerContext.Provider value={state}>
            <DispatchPlayerContext.Provider value={dispatch}>
                <QueryClientProvider client={queryClient}>
                    <ClientOnly>
                        <RecoilRoot>
                            <WagmiConfig client={wagmiClient}>
                                <RainbowKitProvider
                                    chains={chains}
                                    theme={
                                        _theme === "dark"
                                            ? darkTheme()
                                            : lightTheme()
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
            </DispatchPlayerContext.Provider>
        </PlayerContext.Provider>
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
