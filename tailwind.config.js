/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./containers/**/*.{js,ts,jsx,tsx}",
        "./ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                GREEN: "#34D399",
                RED: "#EF4444",
                MAIN_DARK: "#130b1b",
                DARK_PURPLE: "#373055",
                LIGHT_PURPLE: "#bd97e9",
                PURPLE: "#6f629e",
                PINK: "#f8c8ed",
                CONNECT_WINDOW: "#1D1029",

                buttonDangerBg: "#CA4F4F",
                buttonDangerBgHover: "#802323",
                buttonDangerColor: "#FFEEEE",
                buttonDarngetColorHover: "#F3F0FF",

                buttonBlueeBg: "#3b82f6",
                buttonBlueeBgHover: "#1e3a8a",
                buttonBlueeColor: "#FFFFFF",
                buttonBlueeColorHover: "#FFFFFF",

                buttonopenblueBg: "#2563eb",
                buttonopenblueBgHover: "#1e3a8a",
                buttonopenblueColor: "#FFFFFF",
                buttonopenblueColorHover: "#FFFFFF",

                buttonPrimaryBg: "#361151",
                buttonPrimaryBgHover: "#6B628E",
                buttonPrimaryColor: "#F3F0FF",
                buttonPrimaryColorHover: "#F3F0FF",

                sidebarLight: "#FFFEFF",
                sidebarDark: "#0E0616",

                emptyNoteBg: "#FFF0FC",
                sidebarNoteLight: "#FFE7F9",
                sidebarNoteDark: "#1E1427",
            },
            borderWidth: {
                1: "1px",
            },
            height: {
                "screen-overflow": "calc(100vh + 120px)",
                "screen-half": "calc(100vh / 2)",
            },
            minHeight: {
                "screen-overflow": "calc(100vh + 120px)",
            },
            scale: {
                102: "1.02",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
