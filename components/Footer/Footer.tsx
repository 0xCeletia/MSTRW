import LogoSm from "assets/logo/logo-small.png";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiDocsdotrs } from "react-icons/si";
import Image from "next/image";
import { Container } from "components";

export const Footer = () => {
    return (
        <div className=" z-10 fixed inset-x-0 bottom-0 border-t-1 bg-white border-neutral-200 dark:border-DARK_PURPLE py-6 ">
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
    );
};
