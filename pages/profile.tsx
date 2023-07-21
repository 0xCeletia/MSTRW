import { Container, Header, Navbar } from "components";
import { AddressComponent } from "components";
import { Paths } from "consts/paths";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/alert";
import { CgProfile } from "react-icons/cg";
import { getAccount } from "@wagmi/core";

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

    return (
        <>
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
                <div className="overlay">
                    <Header title={`Music Catalog`} />
                    <Navbar />
                    <Container className="basis-1/2 bg-slate-300">
                        <Container className="mt-20">
                            <h1 className={style.title}>
                                {/* with this address && check i managed to ensure that the 
                        AddressComponent is only rendered when address is defined */}
                                {address && (
                                    <AddressComponent address={address} />
                                )}
                            </h1>
                            <hr></hr>
                        </Container>
                    </Container>
                </div>
            )}
        </>
    );
};

export default Profile;
