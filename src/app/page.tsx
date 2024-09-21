'use client'

import AccountDetails from "@/components/account-details/account-details";
import LatestCompMatches from "@/components/latest-comp-matches/latest-comp-matches";
import LatestMatches from "@/components/latest-matches/latest-matches";
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
          <LatestCompMatches />
          <LatestMatches />
        </>
      }
    </>
  );
}
