import type { Metadata } from "next";
import "./styles/globals.scss";
import { Play } from 'next/font/google'
import Header from "@/components/header/header";
import { AccountProvider } from "@/context/account-context";
import { MessageProvider } from "@/context/message/message-context";
import { MatchesProvider } from "@/context/matches-context";
import Footer from "@/components/footer/footer";

const play = Play({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Valspector - Valorant Game Inspector",
  description: "Valspector retrieves and displays detailed Valorant stats, including match history, performance metrics, and rankings."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={play.className}>
        <AccountProvider>
          <MatchesProvider>
            <MessageProvider>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </MessageProvider>
          </MatchesProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
