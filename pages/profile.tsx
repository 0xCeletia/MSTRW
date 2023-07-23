import {
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useWaitForTransaction,
} from "wagmi";

import { Container, Header, Navbar } from "components";
import { AddressComponent } from "components";
import { Paths } from "consts/paths";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/alert";
import { CgProfile } from "react-icons/cg";
import { getAccount } from "@wagmi/core";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Image from "next/image";
import LogoSm from "assets/logo/logo-small.png";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiDocsdotrs } from "react-icons/si";
import contractInterface from "../contract-abi.json";
import contractInterfaceII from "../contract-abi-2.json";
import { useEffect, useRef, useState } from "react";

const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: "w-full object-cover",
    infoContainer: "w-screen px-4",
    midRow: "w-full flex justify-center text-white",
    endRow: "w-full flex justify-end text-white",
    profileImg:
        "w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]",
    socialIconsContainer: "flex text-3xl mb-[-2rem]",
    socialIconsWrapper: "w-44",
    SocialIconsContent:
        "flex container justify-between text-[1.4rem] border-2 rounded-lg px-2",
    socialIcon: "my-2",
    divider: "border-r-2",
    title: "text-5xl font-bold mb-4",
    createdBy: "text-lg mb-4",
    statsContainer:
        "w-[44vw] ex justify-between py-4 border border-[#151b22] rounded-xl mb-4",
    collectionStat: "w-1/4",
    statValue: "text-3xl font-bold w-full flex items-center justify-center",
    ethLogo: "h-6 mr-2",
};

const Profile: NextPage = () => {
    const { isConnected, isReconnecting, isConnecting } = useAccount();
    // const router = useRouter();
    // const token = useToken();

    // useEffect(() => {
    //     if (isReconnecting || isConnecting) return;
    //     if (!isConnected) {
    //         router.replace(Paths.CONNECT_WALLET);
    //     }
    // }, [isConnected, router, isReconnecting, isConnecting]);

    const router = useRouter();

    const account = getAccount();

    const address = account.address;

    const addressCapitalized = address?.toUpperCase();

    const [totalNfts, setTotalNfts] = useState(0);

    const { config: configD } = usePrepareContractWrite({
        address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
        abi: contractInterfaceII,
        functionName: "balanceOf",
        args: [address, "0"],
    });

    const { data: balanceOfData, isIdle } = useContractRead({
        ...configD,
        functionName: "balanceOf",
        watch: true,
        args: [address, "0"],
    });

    useEffect(() => {
        if (balanceOfData) {
            setTotalNfts(Number(balanceOfData));
        }
    }, [balanceOfData]);

    const { data: OfData } = useContractRead({
        ...configD,
        functionName: "balanceOf",
        watch: true,
        args: [address, "0"],
    });
    useEffect(() => {
        if (OfData) {
            setTotalNft(Number(OfData));
        }
    }, [OfData]);

    const [totalNft, setTotalNft] = useState(0);

    return (
        <>
            <section className=" w-full overflow-hidden min-h-full">
                {!isConnected && (
                    <div className="overlay body">
                        <Header title={`Music Catalog`} />
                        <Navbar />
                        <Container className="">
                            <Container className="mt-10">
                                <h1 className="text-4xl mt-52 font-bold mb-4 text-center">
                                    Connect to your wallet to get started!
                                </h1>

                                <p
                                    className="text-center mt-8 underline text-lg cursor-pointer"
                                    onClick={() => router.push(Paths.LANDING)}
                                >
                                    go to home page
                                </p>
                            </Container>
                        </Container>
                    </div>
                )}
                {isConnected && (
                    <div className="overlay ">
                        <Header title={`Music Catalog`} />
                        <Navbar />
                        <Container className="">
                            <Container className="mt-20">
                                <h1 className="text-7xl font-bold mb-4 text-stone-900">
                                    {/* with this address && check i managed to ensure that the 
                        AddressComponent is only rendered when address is defined */}
                                    {address && (
                                        <AddressComponent
                                            address={addressCapitalized}
                                        />
                                    )}
                                </h1>
                            </Container>
                            <div className="mt-10">
                                {/* text-center ekleyebilirsin alttakileri şey etmek için */}
                                <Tabs isFitted size="lg" className="">
                                    <TabList
                                        width="96px"
                                        height="96px"
                                        className="ml-[352px] space-x-14"
                                    >
                                        <Tab
                                            _selected={{
                                                color: "white",
                                                bg: "blue.500",
                                            }}
                                            className="text-2xl"
                                        >
                                            Dashboard
                                        </Tab>
                                        <Tab
                                            _selected={{
                                                color: "white",
                                                bg: "blue.500",
                                            }}
                                            className="mr-2
                                        text-2xl"
                                        >
                                            Catalog
                                        </Tab>
                                        <Tab
                                            className="mr-2 text-2xl"
                                            _selected={{
                                                color: "white",
                                                bg: "blue.500",
                                            }}
                                        >
                                            Allowlists
                                        </Tab>
                                    </TabList>
                                    <hr className=""></hr>

                                    <TabPanels className="mt-20">
                                        <TabPanel>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 ">
                                                <div className="mb-8 last:mb-0 sm:mb-0 ">
                                                    <div className="text-3xl font-[700] text-gray-900 mb-8">
                                                        total NFTs
                                                    </div>
                                                    <h3 className="text-4xl text-gray-100 md:text-3xl lg:text-[56px] ">
                                                        {totalNft}
                                                    </h3>
                                                </div>
                                                <div className="mb-8 last:mb-0 sm:mb-0 ">
                                                    <div className="text-3xl font-[700] text-gray-900 mb-8 flex items-center justify-start">
                                                        catalog value{" "}
                                                    </div>
                                                    <h3 className="text-4xl  text-gray-100 md:text-3xl lg:text-[56px]">
                                                        0 eth
                                                    </h3>
                                                    <p className="mt-4 text-lg text-gray-400 sm:h-[30px] lg:-mt-15">
                                                        ≈ 0 usd
                                                    </p>
                                                    <p className=" text-xs text-gray-600 sm:h-[30px] lg:-mt-15">
                                                        calculated based on
                                                        floor prices
                                                    </p>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="ab-container mt-5 pb-12 lg:mt-28 ">
                                                <div className="mb-24 pb-24">
                                                    <h2 className="ab-section-subtitle uppercase text-3xl font-[700] text-gray-900 mb-8">
                                                        my drops
                                                    </h2>
                                                    {/* <table className="w-full border-collapse text-sm">
                                                        <tr>
                                                            <th className="ab-text-opacity text-slate-800 border-gray-700 px-6 py-4 text-start">
                                                                song
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 hidden border-gray-700 px-6 py-4 text-start sm:table-cell">
                                                                royalties
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 hidden border-gray-700 px-6 py-4 text-start sm:table-cell">
                                                                streams
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 border-gray-700 px-6 py-4 text-start">
                                                                listed
                                                            </th>
                                                        </tr>
                                                    </table>
                                                    <table className="w-full border-collapse text-sm">
                                                        <tr>
                                                            <th className="ab-text-opacity text-left text-slate-800 border-gray-700 px-4 py-4 ">
                                                                stressed out
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 hidden border-gray-700 -translate-x-20 py-4 px-8 text-start sm:table-cell">
                                                                %0.0078
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 hidden border-gray-700 -translate-x-16 px-6 py-4 text-left sm:table-cell">
                                                                10.0k/m
                                                            </th>
                                                            <th className="ab-text-opacity text-slate-800 border-gray-700 px-6 py-4 text-start">
                                                                opensea
                                                            </th>
                                                        </tr>
                                                    </table> */}

                                                    {isIdle && (
                                                        <p className="text-gray-400 mt-4">
                                                            Your wallet is
                                                            empty. If you minted
                                                            recently wait a
                                                            while.
                                                        </p>
                                                    )}
                                                    {!isIdle && (
                                                        <p className="text-gray-400 mt-4">
                                                            Your wallet is
                                                            empty. If you minted
                                                            recently wait a
                                                            while.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            {/* buraya isConnected tarzı şartlar koyucaz
                                        function: balanceOf, parameters: address, 1(tokenid)
                                        */}
                                            <div className="flex flex-col ">
                                                <p className="text-gray-400 mt-4">
                                                    this wallet has not been on
                                                    the allowlist for any drop.
                                                </p>
                                                <p className="text-gray-400 mt-4">
                                                    wait for the oncoming drops.
                                                </p>
                                            </div>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                            {/* <hr className="mt-20"></hr> */}
                        </Container>
                    </div>
                )}
            </section>
            <div className=" absolute inset-x-0 bottom-0 border-t-1 bg-white border-neutral-200 dark:border-DARK_PURPLE py-6 mt-[108px]">
                <Container className="flex flex-col md:flex-row justify-center items-center">
                    <div className="flex justify-center items-center md:mr-auto">
                        <Image
                            src={LogoSm}
                            alt="Logo"
                            className="mr-3 w-[32px] h-[32px] shrink-0"
                        />
                        <span className="block text-sm text-neutral-500 dark:text-neutral-200">
                            All rights reserved | 2023
                        </span>
                    </div>
                    <div className="flex translate-x-1 mt-4 md:mt-0">
                        <a
                            className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
                            href="https://github.com/masterwave"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <BsGithub
                                className="hover:scale-110 duration-100"
                                fontSize={20}
                            />
                        </a>
                        <a
                            className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
                            href="https://masterwave.xyz/docs"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <SiDocsdotrs
                                className="hover:scale-110 duration-100"
                                fontSize={20}
                            />
                        </a>
                        <a
                            className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
                            href="https://twitter.com/masterwavexyz"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <BsTwitter
                                className="hover:scale-110 duration-100"
                                fontSize={20}
                            />
                        </a>
                    </div>
                </Container>
            </div>
            ;
        </>
    );
};

export default Profile;
