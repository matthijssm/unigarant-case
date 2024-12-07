import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./_components/Providers";

const berninaSans = localFont({
    src: "./fonts/BerninaSansRegular.woff",
    variable: "--font-bernina-sans",
    weight: "400",
});

const clanPro = localFont({
    src: "./fonts/ClanProSemiBold.ttf",
    variable: "--font-clan-pro",
    weight: "600",
});

export const metadata: Metadata = {
    title: "ANWB Verzekeren Keuzehulp",
    description: "Deze tool helpt je bij he",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${berninaSans.variable} ${clanPro.variable} antialiased font-sans py-8`}>
                <Providers>
                    <main className="container px-4">
                        <div className="max-w-lg mx-auto rounded-lg border-background-border border p-8">
                            {children}
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
