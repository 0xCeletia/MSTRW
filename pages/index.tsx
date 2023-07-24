import { ethers } from "ethers";

import {
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useWaitForTransaction,
} from "wagmi";
import { getAccount } from "@wagmi/core";
import { Container, Header, Navbar } from "components";
import type { NextPage } from "next";
import { AiOutlineWallet } from "react-icons/ai";
import { Button } from "ui";
import Screens from "assets/screens.png";
import Purple from "assets/purple.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { BsGithub, BsTwitter } from "react-icons/bs";
import Flying from "assets/flying.png";

import { useEffect, useRef, useState } from "react";
import LogoSm from "assets/logo/logo-small.png";
import { SiDocsdotrs } from "react-icons/si";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { BsUnlock, BsUiChecks } from "react-icons/bs";

import { SlCreditCard } from "react-icons/sl";
import {
    TbArrowsExchange,
    TbBattery3,
    TbClockHour12,
    TbClockHour6,
    TbClockHour9,
    TbClockHour3,
} from "react-icons/tb";
import { RiWallet3Line, RiToolsLine } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import contractInterface from "../contract-abi.json";
import contractInterfaceII from "../contract-abi-2.json";
import { parseEther } from "ethers/lib/utils.js";
import { Progress } from "flowbite-react";

const Home: NextPage = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const { isConnected, isDisconnected } = useAccount();
    const theme = useTheme();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const initialPos = useRef<number>(0);
    const offsetTop = useRef<number>(0);
    const account = getAccount();

    {
        /* deniyorum */
    }

    const address = account.address;

    // const { config: configD } = usePrepareContractWrite({
    //     address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
    //     abi: contractInterfaceII,
    //     functionName: "claim",
    //     args: [
    //         address,
    //         "0",
    //         "1",
    //         "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //         "9000000000000000",
    //         {
    //             proof: [
    //                 "0x0000000000000000000000000000000000000000000000000000000000000000",
    //             ],
    //             quantityLimitPerWallet:
    //                 "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    //             pricePerToken: "9000000000000000",
    //             currency: "	0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    //         },
    //         "0x",
    //     ],
    // });

    const { config: configD } = usePrepareContractWrite({
        address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
        abi: contractInterfaceII,
        functionName: "claim",
        args: [
            address,
            "0",
            "1",
            "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            "900000000000000",
            {
                proof: [],
                quantityLimitPerWallet:
                    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                pricePerToken: "900000000000000",
                currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            },
            "0x",
            { value: "900000000000000", from: address },
        ],
    });

    const {
        data: claimData,
        write: claim,
        isLoading: isClaimLoading,
        isSuccess: isClaimStarted,
    } = useContractWrite(configD);

    const { isSuccess: txSuccessD, isError } = useWaitForTransaction({
        hash: claimData?.hash,
    });

    const isClaimed = txSuccessD;

    {
        /* 
    supply of all minted
*/
    }

    const [wholeNfts, setWholeNfts] = useState(0);

    const { config: configE } = usePrepareContractWrite({
        address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
        abi: contractInterfaceII,
        functionName: "totalSupply",
        args: ["0"],
    });

    const { data: balanceOfWhole } = useContractRead({
        ...configE,
        functionName: "totalSupply",
        watch: true,
        args: ["0"],
    });

    useEffect(() => {
        if (balanceOfWhole) {
            setWholeNfts(Number(balanceOfWhole));
        }
    }, [balanceOfWhole]);

    const { openConnectModal } = useConnectModal();

    https: return (
        <>
            <Header />
            <Navbar />

            <section className=" w-full overflow-hidden min-h-screen ">
                {/* w-[100%] md:w-[85%] bunu silince düzeldi, soldaydı
                    md:mt-[24px] yukarıyla olan mesafe
                */}
                {/* w-16 h-16 yazının değil direkt objenin büyüklüğünü belirliyor
                    bg-black = background black
                    py-1 px-8 hareket ettiriyor yazıyı
                    m-1 objeyi direkt kaydırdı çapraz aşağı
                    text-sm small demek md medium lg large xl 2xl ******
                    md:w-32 objeyi büyüttü aynı şey w-16yla gibi
                    md:text-base kalınlaştırdı ama text-sm'yi etkisiz kıldı
                    lg:w-48 genişletti ama md:w-48 ve w-48 'den ne farkı var anlamış değilim
                    lg:text-lg yazıyı genişletti text-sm'yi etkisiz kıldı md:text-base i etkisiz kıldı
                    mb-[60px] md:mb-[96px] margini sildim yukardan
                    -------------------------------------------------------------------------------------
                */}
                {/* une image pour write onto it
                    image'ın classında yazan bu direkt genel boyutu belirliyor md:w-[71%]
                    bg-gradient-to-tr from-purple-200 to-blue-400 sildim
                    bg-rose-300 sildim
                    */}
                <div className="  bg-gradient-to-tr from-rose-300 to-sky-400 bg-cover bg-center h-96 w-[100%] relative">
                    <Image
                        src={Purple}
                        className="hidden h-96 md:flex w-[100%]  object-cover absolute mix-blend-overlay"
                        alt="purple"
                    />

                    <div className="p-24">
                        <h1 className="text-black text-6xl font-bold">
                            INVEST IN MUSIC
                        </h1>
                        <h2 className="text-black text-3xl font-light">
                            <br /> support your favorite artists
                        </h2>
                    </div>
                </div>
                {/* md:text[] yazının boyutu
                    GREEN & RED rengini ben tailwind-config den kendim atadım 
                    md:mt-[24px] idi
                    */}
                {/* <h1 className="text-center  text-[32px] md:text-[64px] font-[700] mt-[20px] md:mt-[24px] max-w-[1450px] rubik text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[72px] ">
                    INVEST IN MUSIC
                </h1>
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-MAIN_DARK ">
                    The Next
                </h1> */}
                {/* bu container yeni
                    classname'de flex-col vardı onu silince h4 yana geldi, aşağıdaydı
                    classnamedeki md:mt-[96px] üsttekiyle aradaki mesafeyi belirliyor
                    objeleri ortalıyor
                    items-center i silince kutu büyüdü
                */}
                <Container className="mt-[60px] md:mt-[42px] flex ">
                    {/* Image className'deki w-[100%] md:w-[75%] kısmının 75 olanı boyutu belirliyor.
                        -translate-x-20 veya -translate-y-20 y ve x yönünde hareket ettiriyor
                        */}
                    <Image
                        className=" -translate-x-10 bg-cover bg-center w-[96px] h-[444px] blur-[2px] -translate-y-10 hidden md:flex md:w-[100%] "
                        src={Screens}
                        alt="albumcover!!"
                    />
                    {/* h4 ve button için yeni bir container açtım şimdi ki alt alta dursunlar
                        omg oldu ama sağa çekmem gerekiyor yani ortalamalıyım şimdi
                        wow translate -10 yapabildim butonda ve w-full ile genişlettim
                        biraz da text i yukarı kaldıralım y-40 yaptım max o kadar
                        ------------------------------------------------------------
                        container'a className ekleyerek md:mt-[-50px] ile direkt bu kısmı yani resmin sağ kısmını komple yukarı alabildim
                        *******************************
                        margin top aşağı indirdi
                        space-y-2 içerdeki objeler arası
                    */}
                    <Container className=" mt-14 -space-y-2 ">
                        {/* translate-y-10 ile yaklaştırdım alttakine
                            ******
                            margin right left ile de hareket ediyor
                        */}
                        <div className="flex justify-between ">
                            <h4 className=" -translate-y-5 ml-5 md:text-[16px] mt-[20px] font-[500] md:mt-[24px] max-w-[800px] md:leading-[40px] rubik text-emerald-700 dark:text-white">
                                active listing |
                            </h4>
                            {isConnected && (
                                <p className="text-[28px]">
                                    100 of {wholeNfts} minted
                                </p>
                            )}

                            {!isConnected && (
                                <p className="text-[28px]">total 100 mints</p>
                            )}
                            <h4 className=" -translate-y-5 mr-5 font-[500] text-right text-[16px] md:text-[16px] mt-[20px] md:mt-[24px] text-emerald-700 max-w-[800px] md:leading-[40px] rubik dark:text-white">
                                | minting phase
                            </h4>
                        </div>
                        {/* seni yeni ekledim
                            md:leading-[52px] satır arası boşluk
                            md:mt-[44px] üstteki itemle olan boşluk
                        */}
                        <h1 className="  text-[64px] md:text-[24px] md:mt-[-16px] font-[700] text-center text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[52px] w-[100%] md:w-[85%]">
                            {" "}
                            <span className="text-blue-600">
                                latest drop
                            </span>,{" "}
                            <span className="text-orange-400">
                                brought to you by
                            </span>{" "}
                        </h1>
                        <h1 className="text-[64px] md:text-[24px] md:mt-[-16px] font-[700] ml-10 text-green-600 dark:text-white mb-0 rubik leading-[40px] md:leading-[52px] w-[100%] md:w-[85%]">
                            Max Harmon
                        </h1>
                        <h1 className="mt-[60px] flex items-center text-[64px] md:text-[24px] md:mt-[-16px] font-[700] ml-10 text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[52px] w-[100%] md:w-[85%]">
                            /Timeless Tunes
                        </h1>

                        {/* bu div ile arkaya kutu ekledim */}
                        <div className="col bg-neutral-20 dark:bg-green-100 rounded-lg px-4 py-4 md:p-8 shadow-md">
                            {/* hover:rounded-3xl manyak
                                ease-linear iyi oluyor
                                transition-all da olsun
                            */}
                            {!isConnected && (
                                <div>
                                    <Button
                                        onClick={openConnectModal}
                                        color="bluee"
                                        className="button w-full -translate-x--8 hover:rounded-3xl hover:bg-blue-300 transition-all cursor-pointer duration-300 ease-linear -translate-y-6 mt-[24px] md:mt-[32px] h-16 pl-4 pr-4 text-[18px]"
                                    >
                                        connect to wallet to mint
                                    </Button>
                                </div>
                            )}

                            {/* sen azcık dur burda */}
                            {mounted && isConnected && !isClaimed && (
                                <Button
                                    onClick={() => {
                                        claim?.();
                                    }}
                                    leftIcon={<AiOutlineWallet />}
                                    color="openblue"
                                    className="button w-full -translate-x--8 hover:rounded-3xl hover:bg-blue-300 transition-all cursor-pointer duration-300 ease-linear -translate-y-6 mt-[24px] md:mt-[32px] h-16 pl-4 pr-4 text-[18px]"
                                    disabled={
                                        isClaimLoading ||
                                        isClaimStarted ||
                                        isError
                                    }
                                    data-mint-loading={
                                        isClaimLoading && isError!
                                    }
                                    data-mint-started={
                                        isClaimStarted && !isError
                                    }
                                    data-mint-failed={isError}
                                >
                                    {isClaimLoading && "Waiting for approval"}
                                    {isError && "Failed"}
                                    {isClaimStarted && !isError && "Minting..."}
                                    {!isClaimLoading &&
                                        !isClaimStarted &&
                                        "Mint for 0.009 ETH"}
                                </Button>
                            )}

                            {/* butonumuzu aazcık değiştirdik */}
                            {/* {mounted && !isMinted && (
                                <Button
                                    onClick={() => mint?.()}
                                    leftIcon={<AiOutlineWallet />}
                                    color="openblue"
                                    className="  w-full -translate-x--8 hover:rounded-3xl hover:bg-blue-300 transition-all cursor-pointer duration-300 ease-linear -translate-y-6 mt-[24px] md:mt-[32px] h-16 pl-4 pr-4 text-[18px]"
                                    disabled={isMintLoading || isMintStarted}
                                    data-mint-loading={isMintLoading}
                                    data-mint-started={isMintStarted}
                                >
                                    {isMintLoading && "Waiting for approval"}
                                    {isMintStarted && "Minting.."}
                                    {!isMintLoading && !isMintStarted && "Mint"}
                                </Button>
                            )} */}
                            {/* <Button
                                onClick={() => mint?.()}
                                leftIcon={<AiOutlineWallet />}
                                color="openblue"
                                className="w-full -translate-x--8 hover:rounded-3xl hover:bg-blue-300 transition-all cursor-pointer duration-300 ease-linear -translate-y-6 mt-[24px] md:mt-[32px] h-16 pl-4 pr-4 text-[18px]"
                            >
                                mint
                            </Button> */}
                            {isClaimed && (
                                <section
                                    className="w-full -translate-x--8
                                hover:rounded-xl rounded-xl hover:bg-blue-300  
                                 bg-gradient-to-tr from-rose-100 to-sky-100
                                linear-gradient(-370deg, #3898FF, #7A70FF) transition-all
                                 duration-300 ease-linear
                                -translate-y-3 h-36 pl-4 pr-4
                                text-[18px]"
                                >
                                    <h1 className=" text-2xl text-center tracking-wide mb-2 text-MAIN_DARK font-[600]">
                                        NFT Minted!
                                    </h1>
                                    <h1 className=" text-lg leading-relaxed text-rose-900 text-center rubik mb-3 font-[600] ">
                                        Your NFT will show up in your wallet in
                                        the next few minutes.
                                    </h1>

                                    <p className="text-l text-center text-base font-[500]">
                                        View on{""}
                                        <a
                                            href={`https://goerli.etherscan.io/tx/${claimData?.hash}`}
                                        >
                                            {" "}
                                            <span className="underline">
                                                Etherscan
                                            </span>
                                        </a>
                                        &nbsp; &nbsp; &nbsp; &nbsp; View on{""}
                                        <a
                                            href={`https://testnets.opensea.io/assets/goerli/${configD.address}/0`}
                                        >
                                            {" "}
                                            <span className="underline">
                                                Opensea
                                            </span>
                                        </a>
                                    </p>
                                </section>
                            )}
                        </div>
                    </Container>
                </Container>
                {/* SENDE YENİSİN ALTTAKİ ÖZELLİKLER KISMI OLCAN
                max-w-[800px] eklersen daralır */}
                <Container>
                    <div className=" col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
                        <h1 className="text-[32px] md:text-[44px] font-[700] text-left text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[72px] w-[100%] md:w-[85%]">
                            See <span className="text-blue-600">Market</span>{" "}
                            <span className="text-orange-400">Stats</span> And{" "}
                            <span className="text-green-600"> More</span>{" "}
                        </h1>
                        {/* with this classname i maanaged to enlist the headings
                            and with items-center text is centered
                            --------------------------------------
                            and if i want objects to side by side
                            i'd create a container containing the sides like
                            <Container className="mt-[60px] md:mt-[76px] flex  items-center">
                            riwallet2line idi

                        */}
                        <Container className="mt-[20px] md:mt-[20px] flex items-center">
                            <Container className=" grid grid-cols-4 ">
                                <section>
                                    <div className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                        <RiWallet3Line
                                            fontSize={48}
                                            color="blue"
                                        />
                                    </div>
                                    <p className="text-base font-mono font-semibold -translate-x-16 text-MAIN_DARK text-center text-[22px] max-w-[800px] md:leading-[40px] rubik">
                                        $170.00
                                    </p>

                                    <p className="text-base font-regular -translate-x-16 text-slate-400 text-center text-[16px] md:text-[20px] max-w-[800px]  rubik">
                                        Initial Price
                                    </p>
                                </section>
                                <section>
                                    <div className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                        <IoDiamondOutline
                                            fontSize={48}
                                            color="blue"
                                        />
                                    </div>
                                    <p className="text-base font-mono font-semibold -translate-x-16 text-MAIN_DARK text-center text-[22px] max-w-[800px] md:leading-[40px] rubik">
                                        0.0078% ownership
                                    </p>

                                    <p className="text-base font-regular -translate-x-16 text-slate-400 text-center text-[16px] md:text-[20px] max-w-[800px]  rubik">
                                        royalties
                                    </p>
                                </section>
                                <section>
                                    <div className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                        <TbArrowsExchange
                                            fontSize={48}
                                            color="blue"
                                        />
                                    </div>
                                    <p className="text-base font-mono font-semibold -translate-x-16 text-MAIN_DARK text-center text-[22px] max-w-[800px] md:leading-[40px] rubik">
                                        100 total
                                    </p>

                                    <p className="text-base font-regular -translate-x-16 text-slate-400 text-center text-[16px] md:text-[20px] max-w-[800px]  rubik">
                                        edition
                                    </p>
                                </section>
                                <section>
                                    <div className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                        <TbBattery3
                                            fontSize={48}
                                            color="blue"
                                        />
                                    </div>
                                    <p className="text-base font-mono font-semibold -translate-x-16 text-MAIN_DARK text-center text-[22px] max-w-[800px] md:leading-[40px] rubik">
                                        8 may, 2023
                                    </p>

                                    <p className="text-base font-regular -translate-x-16 text-slate-400 text-center text-[16px] md:text-[20px] max-w-[800px]  rubik">
                                        went live
                                    </p>
                                </section>
                            </Container>
                        </Container>
                    </div>
                </Container>
                <Container>
                    <h2 className="text-center mt-[40px] text-[24px] md:text-[48px] font-[600] rubik text-MAIN_DARK dark:text-white rubik">
                        About it
                    </h2>
                    <h4 className="text-center mt-[24px] text-[14px] md:text-[20px] font-[400] rubik text-neutral-700 dark:text-neutral-100 max-w-[512px] ml-auto mr-auto rubik">
                        Max Harmon's debut album, "Timeless Tunes" demonstrates
                        both the group's exceptional vocal abilites and
                        highlights their growth as producer and songwriters.
                    </h4>
                    {/* main features ın altındaki özellikler şeyini yapıyor, ortalıyor, yan yana diziyor  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-[32px] space-y-4 md:space-y-0 md:space-x-8">
                        <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
                            <div className="bg-slate-400 rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                                <BsUiChecks fontSize={48} color="black" />
                            </div>
                            <h4 className="mt-[12px] mb-[12px] text-2xl font-semibold text-MAIN_DARK dark:text-PINK">
                                what you get
                            </h4>
                            <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                                You get streaming royalties by buying a token
                                for the album.
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-[22px] space-y-2 md:space-y-0 md:space-x-8">
                                <div className="col bg-neutral-100 dark:bg-green rounded-lg px-4 py-4 md:p-8 shadow-md">
                                    <h4 className="text-center  text-[14px] mb-2 font-[600] rubik text-slate-900 dark:text-white rubik">
                                        Royalties
                                    </h4>
                                    <h3 className="text-center text-buttonopenblueBg font-bold text-[20px]">
                                        0.008%
                                    </h3>
                                </div>
                                <div className="col bg-neutral-100 dark:bg-green rounded-lg px-4 py-4 shadow-md">
                                    <div className=" rounded-full h-[48px] flex mb-1 justify-center items-center text-MAIN_DARK ">
                                        <BsUnlock fontSize={24} color="blue" />
                                    </div>
                                    <h3 className="text-[14px] font-[600] text-center text-slate-900 dark:text-white mb-0 rubik pl-5 w-[100%] md:w-[85%]">
                                        Exclusive content
                                    </h3>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
                            <div className="bg-PINK rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                                <AiFillLock fontSize={48} />
                            </div>
                            <h4 className="mt-[12px] text-2xl font-semibold text-DARK_PURPLE dark:text-PINK">
                                Encryption
                            </h4>
                            <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                                Your notes are encrypted before being stored.
                                You can make sure that your notes are safe and
                                only visible to you!
                            </h4>
                        </div> */}
                        {/* note sharing kısmı bu dive ait */}
                        {/* arkadaki soyut kutu bunun*/}
                        <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
                            {/* alttaki div logoyu ve arkasını hallediyor, içerdeki BsFillShareFill.. logoyu 
                            RiEarthLine
                            SlCreditCard

                            */}
                            <div className="bg-slate-400  rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                                <SlCreditCard fontSize={48} />
                            </div>
                            <h4 className="mt-[12px] mb-[12px] text-2xl font-semibold text-MAIN_DARK dark:text-PINK">
                                more streaming more earning
                            </h4>
                            <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                                It is forecasted 1 million streams over the next
                                6 months. <br />
                                It may outplay the forecasts. You can see how
                                much you could earn.
                            </h4>
                            <div className=" mt-[22px] space-y-2 md:space-y-0 md:space-x-8">
                                <div className="col bg-neutral-100 dark:bg-green rounded-lg px-4 py-4 shadow-md">
                                    <div className="flex items-center ">
                                        <h3 className="text-[14px] font-[600] text-left text-slate-900 dark:text-white mt-0 rubik pl-0 w-[100%] md:w-[85%]">
                                            we are using the latest technologies
                                            with high quality standard.
                                        </h3>

                                        <div className=" rounded-full h-[48px] flex mb-1 justify-center items-center text-MAIN_DARK ">
                                            <RiToolsLine
                                                fontSize={24}
                                                color="blue"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <div className="sticky top-0">
                    <Container className="min-h-screen-overflow md:min-h-screen md:justify-center flex flex-col overflow-hidden">
                        <h2 className="text-center mt-[60px] text-[24px] md:text-[48px] font-[600] rubik text-MAIN_DARK dark:text-white rubik">
                            mint phases
                        </h2>
                        {/* We are using the latest technologies with high code
                            quality standard. All the code is open source and we
                            are open to future contributions! Our primary sales
                            has not started yet. */}
                        <h4 className="text-center mt-[24px] text-[14px] md:text-[20px] font-[400] rubik text-neutral-500 dark:text-neutral-100 max-w-[512px] ml-auto mr-auto rubik">
                            Better take a seat before it's late!
                        </h4>

                        {/* bu logoları yan yana güzelce dizen de bu */}
                        <div
                            className={`flex flex-wrap mt-[12px] justify-center`}
                        >
                            {/* <a> */}
                            {/* <div
                                    // className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                    className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-3"
                                >
                                    <TbClockHour12 fontSize={48} color="blue" />
                                </div>
                                <p>heyyo</p> */}
                            {/* <div className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-3">
                                    <h1>phase 1</h1>
                                </div> */}
                            {/* </a> */}
                            <a>
                                <div
                                    // className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                    className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-14"
                                >
                                    <TbClockHour3
                                        fontSize={48}
                                        color="#15803d"
                                    />
                                </div>
                                <div className="text-center ml-7 xl:text-lg md:mx-8">
                                    <p className="h-5 mt-2 pr-2 font-[700] text-gray-400pr-2 xl:mb-3 text-base text-green-700">
                                        allowlist
                                    </p>
                                    <div className="mb-3">
                                        <p className="h-5 mt-2 text-grau line-through font-[400] text-gray-400 pr-2 xl:mb-3 text-base ">
                                            you can't mint
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="h-5 pr-2 xl:mb-3 text-sm font-[400] text-green-900">
                                            completed
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a>
                                <div
                                    // className=" rounded-full w-[64px] h-[64px] ml-12 flex justify-center items-center text-MAIN_DARK p-4 ">
                                    className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-14"
                                >
                                    <TbClockHour6
                                        fontSize={48}
                                        color="#0e7490"
                                    />
                                </div>
                                <div className="text-center ml-7 xl:text-lg md:mx-8">
                                    <p className="h-5 mt-2 pr-2 font-[700] xl:mb-3 text-base text-cyan-700">
                                        nft holder
                                    </p>
                                    <div className="mb-3">
                                        <p className="h-5 mt-2 text-grau line-through font-[400] text-gray-400 pr-2 xl:mb-3 text-base ">
                                            you can't mint
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="h-5 pr-2 xl:mb-3 text-sm font-[400] text-green-900">
                                            completed
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a>
                                <div className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-14">
                                    <TbClockHour9
                                        fontSize={48}
                                        color="#b91c1c"
                                    />
                                </div>
                                <div className="text-center ml-7 xl:text-lg md:mx-8">
                                    <p className="h-5 mt-2 pr-2 font-[700] xl:mb-3 text-base text-red-700">
                                        public mint
                                    </p>
                                    <div className="mb-3">
                                        <p className="h-5 mt-2 text-grau font-[400] text-gray-400 pr-2 xl:mb-3 text-base ">
                                            you can mint
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="h-5 pr-2 xl:mb-3 text-sm font-[400] text-green-900">
                                            completed
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* */}
                        <div className="mt-8"></div>
                        <div className="w-[572px] ml-[305px] bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-blue-600 text-xl font-medium w-12/12 text-blue-400 text-center p-0.5 leading-none rounded-full">
                                {"  "}
                            </div>
                        </div>
                        {/* */}

                        <hr className="mt-2"></hr>
                        <div className="lg:px-[80px]">
                            <Image
                                ref={imageRef}
                                src={Flying}
                                alt="Flying girl"
                                className="w-[180px] mt-10 ml-auto"
                            />
                        </div>
                    </Container>
                </div>
                {/* h-screen sayfayı uzatıyor haberin ola */}
                {/* <div className="h-screen"></div> */}

                {/* <div className="h-screen-half hidden md:flex"></div> */}
                {/* burası ekranı altta kaydıran şey */}
            </section>

            <div className="border-t-1 border-neutral-200 dark:border-DARK_PURPLE py-6 mt-[108px]">
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
        </>
    );
};

export default Home;
