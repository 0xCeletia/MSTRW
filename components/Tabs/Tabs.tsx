import { ethers } from "ethers";

import contractInterfaceII from "../../contract-abi-2.json";
import { useAccount, usePrepareContractWrite, useContractRead } from "wagmi";

import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const TabsComponent = () => {
    const { isConnected, address } = useAccount();
    const [totalNft, setTotalNft] = useState(0);

    // balance data
    const { config: config } = usePrepareContractWrite({
        address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
        abi: contractInterfaceII,
        functionName: "balanceOf",
        args: [address, "0"],
    });

    const { data: balanceData, isIdle } = useContractRead({
        ...config,
        functionName: "balanceOf",
        watch: true,
        args: [address, "0"],
    });
    useEffect(() => {
        if (balanceData) {
            setTotalNft(Number(balanceData));
        }
    }, [balanceData]);

    //priceData
    const [price, setPrice] = useState(0);

    const { config: configP } = usePrepareContractWrite({
        address: "0xE22A757FB9F04d90c406D9ede9f5ED75190e4E97",
        abi: contractInterfaceII,
        functionName: "getClaimConditionById",
        args: ["0", "1"],
    });

    const { data: priceAll } = useContractRead({
        ...configP,
        functionName: "getClaimConditionById",
        watch: true,
        args: ["0", "1"],
    });

    let myPrice = [];
    {
        /* olum ciddi mi == 0 yerine !=0 yaptım ve çözüldü nasıl buluyum ben bunu 
        çözmemişsin değer gidiyor o zaman 0 oluyor. sadece error vermiyor.
        */
    }
    if (Number(address) == 0) {
        myPrice = [];
    } else {
        myPrice = (priceAll as any[])[5];
    }
    const _myPrice = Number(myPrice);
    const __myPrice = Number(ethers.utils.formatEther(_myPrice));
    const totalPrice = __myPrice * totalNft;

    useEffect(() => {
        if (_myPrice) {
            setPrice(Number(_myPrice));
        }
    }, [_myPrice]);

    return (
        <>
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
                                    {totalNft}{" "}
                                </h3>
                            </div>
                            <div className="mb-8 last:mb-0 sm:mb-0 ">
                                <div className="text-3xl font-[700] text-gray-900 mb-8 flex items-center justify-start">
                                    catalog value
                                </div>
                                <h3 className="text-4xl  text-gray-100 md:text-3xl lg:text-[56px]">
                                    {totalPrice.toFixed(4)} eth
                                </h3>
                                <p className="mt-4 text-lg text-gray-400 sm:h-[30px] lg:-mt-15">
                                    ≈ {(totalPrice * 1849).toFixed(2)} usd
                                </p>
                                <p className=" text-xs text-gray-600 sm:h-[30px] lg:-mt-15">
                                    calculated based on floor prices
                                </p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="ab-container mt-5 pb-12 lg:mt-28 ">
                            <div className="mb-24 pb-24">
                                <div className="flex flex-col-2 ">
                                    <h2 className="ab-section-subtitle uppercase text-3xl font-[700] text-gray-900 mb-8 mr-40">
                                        my drops
                                    </h2>
                                    {totalNft > 0 && (
                                        <h2 className="ml-8">{/* heyyo */}</h2>
                                    )}
                                </div>

                                {totalNft == 0 && (
                                    <p className="text-gray-400 mt-4">
                                        Your wallet is empty. If you minted
                                        recently wait a while.
                                    </p>
                                )}
                                {totalNft > 0 && (
                                    <div>
                                        <p className="text-gray-400 mt-4">
                                            click to see on
                                            <a
                                                href={`https://testnets.opensea.io/assets/goerli/${config.address}/0`}
                                            >
                                                {" "}
                                                <span className="underline">
                                                    Opensea
                                                </span>
                                            </a>
                                        </p>
                                    </div>
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
                                this wallet has not been on the allowlist for
                                any drop.
                            </p>
                            <p className="text-gray-400 mt-4">
                                wait for the oncoming drops.
                            </p>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};
