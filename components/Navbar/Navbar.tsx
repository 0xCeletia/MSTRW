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
{
    /* olum sadece @rainbow-me/rainbowkit/package.json'daki export kısmı import ediliyormuş */
}

export const Navbar = () => {
    const router = useRouter();
    const theme = useTheme();
    const toggleTheme = useToggleTheme();

    return (
        <div className="sticky top-0 h-[72px] flex items-center border-b-1 border-[#e7e7e7] dark:border-none bg-[#ffffffC0] dark:bg-[#bd97e910] z-10">
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
                    <div className="w-[150px] flex items-center">
                        <Image
                            // onClick={() => router.push("/")}
                            alt="Logo"
                            src={Logo}
                            className="w-full shrink-0"
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

                        <Button
                            className="w-[88px] hover:rounded-xl"
                            leftIcon={<BsColumnsGap />}
                            // onClick={toggleTheme}
                            color="openblue"
                        />
                        <Button
                            className="w-[88px] hover:rounded-xl"
                            leftIcon={<BsCode />}
                            // onClick={toggleTheme}
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
                        <ConnectButton
                            accountStatus="address"
                            chainStatus="none"
                        />
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
                            className="w-[48px]"
                            leftIcon={<BsSunFill />}
                            onClick={toggleTheme}
                            color="openblue"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};
