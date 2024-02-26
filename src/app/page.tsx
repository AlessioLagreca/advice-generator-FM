"use client";

import mobileDivider from "@/assets/images/pattern-divider-mobile.svg";
import desktopDivider from "@/assets/images/pattern-divider-desktop.svg";
import diceImage from "@/assets/images/icon-dice.svg";
import Image from "next/image";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

type SlipData = {
  slip: {
    id: string;
    advice: string;
  };
};

export default function Home() {
  const api = `https://api.adviceslip.com/advice/${generateRandomNumber()}`;

  const [isFetched, setIsFetched] = useState(true);

  const { isLoading, data, refetch } = useQuery<SlipData>(
    "diceData",
    async () => {
      const res = await fetch(api);
      return await res.json();
    },
    {
      enabled: isFetched,
    }
  );

  useEffect(() => {
    setIsFetched(false);
  }, []);

  function handleRefetch() {
    refetch();
  }

  return (
    <div
      className="font-manrope  
      p-8 min-h-screen bg-dark-blue flex 
      sm:items-center pt-40 sm:pt-8
      justify-center w-full text-white">
      {/* box principale */}
      <section
        className="h-fit relative
        pt-8 flex items-center flex-col
         bg-dark-grayish-blue rounded-xl 
         w-[350px] sm:w-[470px]">
        <p
          className="text-neon-green mb-6
          font-semibold tracking-[3px] text-sm">
          CONSIGLIO: {data?.slip.id}
        </p>

        <section
          className="text-[28px] 
        font-semibold text-center mb-5
        text-light-cyan min-[100px]">
          {isLoading ? "loading..." : <p>"{data?.slip.advice}"</p>}
        </section>

        <section className="mb-16">
          <Image
            className="sm:hidden"
            src={mobileDivider}
            alt="mobile-divider"
          />
          <Image
            className="hidden sm:flex"
            src={desktopDivider}
            alt="desktop-divider"
          />
        </section>

        <button
          onClick={handleRefetch}
          className=" -bottom-[30px] absolute
        bg-neon-green h-16 w-16 flex 
        items-center justify-center
        rounded-full cursor-pointer
        hover:shadow-neon-glow">
          <Image
            src={diceImage}
            alt="dice"
          />
        </button>
      </section>
    </div>
  );
}

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 224) + 1;
}
