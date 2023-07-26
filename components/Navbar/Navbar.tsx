import Logo from "assets/logo/logo-l-m.png";
import LogoWhite from "assets/logo/logo-large-white.png";
import { Container } from "components";
import { Paths } from "consts/paths";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineWallet } from "react-icons/ai";
import { useTheme, useToggleTheme } from "recoil/theme/ThemeStoreHooks";
import { Button } from "ui";
import {
    BsFillMoonFill,
    BsSunFill,
    BsCodeSquare,
    BsColumnsGap,
    BsCode,
    BsFillMenuAppFill,
} from "react-icons/bs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GiCaptainHatProfile } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";
import {
    RiAccountBoxFill,
    RiAccountPinCircleLine,
    RiSkull2Fill,
    RiUser2Line,
    RiUser4Line,
} from "react-icons/ri";
import { ConnectWallet } from "@thirdweb-dev/react";
import { getAccount } from "@wagmi/core";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

{
    /* olum sadece @rainbow-me/rainbowkit/package.json'daki export kısmı import ediliyormuş */
}

export const Navbar = () => {
    const { isConnected, isDisconnected } = useAccount();

    const router = useRouter();
    const theme = useTheme();
    const toggleTheme = useToggleTheme();

    // const address = getAccount();

    const [address, setAddress] = useState(getAccount().address);
    // Update address state if it changes
    useEffect(() => {
        const interval = setInterval(() => {
            const newAddress = getAccount().address;
            if (address !== newAddress) {
                setAddress(newAddress);
            }
        }, 1000); // Check every second

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [address]);

    return (
        <div className="z-50 sticky top-0 h-[72px] flex items-center border-b-1 border-[#e7e7e7] dark:border-none bg-[#ffffffC0] dark:bg-[#bd97e910] ">
            {/* üstteli div için bu:
                sticky ve top-0 navbarın aşağı kaydırsan da durmasını sağlıyor
                top-0 da üst ekrana olan mesafeyi belirliyor
                h-[72px] : height 72px
                flex : y ekseni ortalama itemleri
                items-center y ekseni ortalama yine birlikte kullan ikisini
                z-10 navbarın aşağıdaki resimlerin arkasında kalmamasına yarıyor
                
                
                
                
            */}

            <Container>
                {/* flex objelerin yan yana durmasını sağlıyor
                    justify between ortayı boş bırakıyor
                */}
                <div className="flex justify-between">
                    {/* w-[150-px] onu küçücük yapıyor
                        flex onu ortalıyor y ekseninde
                        items-center logonun oranını koruyor

                    */}
                    <div className="w-[165px] flex items-center">
                        <Image
                            onClick={() => router.push("/")}
                            alt="Logo"
                            src={Logo}
                            className="w-full shrink-0 cursor-pointer "
                        />
                    </div>

                    {/* bunu yeni ekledim navbardaki buton düzenini şey etmek için
                     */}

                    {/* translate ve space ile düzenledim
                        w-full diyince sola geldiler
                        w-[888px] pikseli arttırınca sola geliyorlar
                         space-x-28 genel mesafeyi
                         md:space-x-8 aradaki mesafeyi şey ediyor
                         -translate-x-20
                         -------------------------------------------
                         buton renklerini tailwindconfig'den yapacan
                    */}
                    <div className="flex w-[770px] md:flex-row md:space-x-8">
                        <Button
                            // onClick={() => router.push(Paths.CONNECT_WALLET)}
                            // leftIcon={<AiOutlineWallet />}
                            color="openblue"
                            className="w-[88px] pl-4 pr-4 text-[14px] hover:rounded-xl"
                        >
                            drops
                        </Button>
                        <Button
                            className="w-[88px] text-[14px] hover:rounded-xl"
                            // leftIcon={<BsFillMenuAppFill />}
                            // onClick={toggleTheme}
                            color="openblue"
                        >
                            feeds
                        </Button>
                        {/* 
                        w-[32px] h-[32px]  : şunlarla ikonu büyütebildim
                        */}
                        <Button
                            className="w-[88px] hover:rounded-xl"
                            leftIcon={<BsColumnsGap />}
                            // leftIcon={<GiCaptainHatProfile className="" />}
                            // onClick={() => router.push(`/user/${address}`)}
                            onClick={() =>
                                isConnected
                                    ? router.push(`/user/${address}`)
                                    : router.push(`/user`)
                            }
                            color="openblue"
                        />

                        <Button
                            className="w-[88px] hover:rounded-xl"
                            leftIcon={<BsCode />}
                            // onClick={window.location.reload()}
                            color="openblue"
                            size="small"
                        />
                    </div>

                    {/* flex yine yan yana durduruyor
                        space-x-3 yanındaki butonla mesafe ayarlıyor
                    */}
                    <div className="flex space-x-3">
                        {/* md:w-max : yazıyı kutunun içine düzgün yerleştiriyor
                            md:pl-4 : soldaki boşluğu belirliyor, :pr sağı
                            md:flex i kaldırınca yazı gitti span'de ama hidden ı da kaldırınca geldi
                        */}
                        <section className="m-1 mr-2">
                            <ConnectButton
                                accountStatus="avatar"
                                chainStatus="icon"
                                showBalance={false}
                            />
                        </section>
                        {/* get started butonunu devre dışı bıraktım */}
                        {/* <Button
                            onClick={() => ConnectButton}
                            leftIcon={<AiOutlineWallet />}
                            color="openblue"
                            className="h-12 w-[48px] md:w-max pl-2 md:pl-4 md:pr-4"
                        >
                            <span className="hidden md:flex">Get started</span>
                        </Button> */}
                        {/* w-[48px] = wide 48 px

                        */}

                        <Button
                            className="w-[52px]"
                            // leftIcon={<BsSunFill />}
                            leftIcon={<RiUser4Line />}
                            // onClick={() => router.push(Paths.USER)}
                            onClick={() =>
                                isConnected
                                    ? router.push(`/user/${address}`)
                                    : router.push(`/user`)
                            }
                            color="openblue"
                        />

                        {/* burda bakalım bi custom connectbutton'a */}

                        {/* <ConnectButton.Custom>
                            {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                            }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready =
                                    mounted &&
                                    authenticationStatus !== "loading";
                                const connected =
                                    ready &&
                                    account &&
                                    chain &&
                                    (!authenticationStatus ||
                                        authenticationStatus ===
                                            "authenticated");
                                return (
                                    <div
                                        {...(!ready && {
                                            "aria-hidden": true,
                                            style: {
                                                opacity: 0,
                                                pointerEvents: "none",
                                                userSelect: "none",
                                            },
                                        })}
                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <button
                                                        onClick={
                                                            openConnectModal
                                                        }
                                                        type="button"
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                );
                                            }
                                            if (chain.unsupported) {
                                                return (
                                                    <button
                                                        onClick={openChainModal}
                                                        type="button"
                                                    >
                                                        Wrong network
                                                    </button>
                                                );
                                            }
                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 12,
                                                        color: "#0a0a0a",
                                                    }}
                                                >
                                                    <button
                                                        onClick={openChainModal}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                        type="button"
                                                    >
                                                        {chain.hasIcon && (
                                                            <div
                                                                style={{
                                                                    background:
                                                                        chain.iconBackground,
                                                                    width: 12,
                                                                    height: 12,
                                                                    borderRadius: 999,
                                                                    overflow:
                                                                        "hidden",
                                                                    marginRight: 4,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={
                                                                            chain.name ??
                                                                            "Chain icon"
                                                                        }
                                                                        src={
                                                                            chain.iconUrl
                                                                        }
                                                                        style={{
                                                                            width: 12,
                                                                            height: 12,
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {chain.name}
                                                    </button>
                                                    <button
                                                        onClick={
                                                            openAccountModal
                                                        }
                                                        type="button"
                                                    >
                                                        {account.displayName}
                                                        {account.displayBalance
                                                            ? ` (${account.displayBalance})`
                                                            : ""}
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom> */}
                    </div>
                </div>
            </Container>
        </div>
    );
};
