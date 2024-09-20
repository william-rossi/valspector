'use client'

import AccountDetails from "@/components/account-details/account-details";
import LastCompMatches from "@/components/last-comp-matches/last-comp-matches";
import MyRank from "@/components/my-rank/my-rank";
import TypeNickname from "@/components/type-nickname/type-nickname";
import { useAccount } from "@/context/account-context";

export default function Home() {
  const { account, mmr } = useAccount()
  return (
    <>
      <TypeNickname />
      {
        (account && mmr)
        &&
        <>
          <AccountDetails />
          <MyRank />
        </>
      }
      <LastCompMatches />
    </>
  );
}
