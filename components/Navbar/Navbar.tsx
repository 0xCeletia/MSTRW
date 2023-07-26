import Logo from "assets/logo/logo-l-m.png";
import { Container } from "components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme, useToggleTheme } from "recoil/theme/ThemeStoreHooks";
import { Button } from "ui";
import { BsColumnsGap, BsCode } from "react-icons/bs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiUser4Line } from "react-icons/ri";
import { getAccount } from "@wagmi/core";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const router = useRouter();
    const theme = useTheme();
    const { isConnected } = useAccount();
    const [address, setAddress] = useState(getAccount().address);

    useEffect(() => {
        const interval = setInterval(() => {
            const newAddress = getAccount().address;
            if (address !== newAddress) {
                setAddress(newAddress);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [address]);

    return (
        <div className="z-50 sticky top-0 h-[72px] flex items-center border-b-1 border-[#e7e7e7] dark:border-none bg-[#ffffffC0] dark:bg-[#bd97e910] ">
            <Container>
                <div className="flex justify-between">
                    <div className="w-[165px] flex items-center">
                        <Image
                            onClick={() => router.push("/")}
                            alt="Logo"
                            src={Logo}
                            className="w-full shrink-0 cursor-pointer "
                        />
                    </div>

                    <div className="flex w-[770px] md:flex-row md:space-x-8">
                        <Button
                            color="openblue"
                            className="w-[88px] pl-4 pr-4 text-[14px] hover:rounded-xl"
                        >
                            drops
                        </Button>
                        <Button
                            className="w-[88px] text-[14px] hover:rounded-xl"
                            color="openblue"
                        >
                            feeds
                        </Button>
                        <Button
                            className="w-[88px] hover:rounded-xl"
                            leftIcon={<BsColumnsGap />}
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
                            color="openblue"
                            size="small"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <section className="m-1 mr-2">
                            <ConnectButton
                                accountStatus="avatar"
                                chainStatus="icon"
                                showBalance={false}
                            />
                        </section>

                        <Button
                            className="w-[52px]"
                            leftIcon={<RiUser4Line />}
                            onClick={() =>
                                isConnected
                                    ? router.push(`/user/${address}`)
                                    : router.push(`/user`)
                            }
                            color="openblue"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};
