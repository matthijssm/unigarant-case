import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            "sans": "var(--font-bernina-sans)",
            "heading": "var(--font-clan-pro)",
        },
        container:{
            "center": true,
        },
        extend: {
            colors: {
                brand: {
                    yellow: "rgb(255, 205, 0)",
                    blue: "rgb(0, 61, 134)",
                },
                foreground: {
                    DEFAULT: "rgb(0, 3, 7)",
                    muted: "rgb(96, 96, 96)"
                },
                background: {
                    DEFAULT: "rgb(255, 255, 255)",
                    muted: "rgb(242, 242, 242)",
                    border: "rgb(229, 229, 229)"
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
