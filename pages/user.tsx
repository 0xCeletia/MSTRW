import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Paths } from "consts/paths";

import { AddressComponent } from "components";

import { Container, Header, Footer, Navbar, TabsComponent } from "components";

const UserPage: NextPage = () => {
    const { isConnected, address } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (address && `/user/${address}` !== router.asPath) {
            router.push(`/user/${address}`);
        }
    }, [address, router]);

    // useEffect(() => {
    //     if (!address && `/temizhaller/${address}` !== router.asPath) {
    //         router.push(`/temizhaller`);
    //     }
    // }, [address, router]);
    useEffect(() => {
        if (address && router.asPath == "/user") {
            router.push(`/user/${address}`);
        }
    }, [address, router]);

    return (
        <>
            <Header title="Music Catalog" />
            <Navbar />

            <section className="overlay fixed w-full overflow-hidden min-h-full">
                {isConnected && address != null ? (
                    <Container className="mt-20 mb-20 ">
                        <h1 className="text-7xl font-bold mb-4 text-stone-900">
                            <AddressComponent address={address} />
                        </h1>
                        <TabsComponent />
                    </Container>
                ) : (
                    <div className="overlay body mb-10">
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
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
};

export default UserPage;
