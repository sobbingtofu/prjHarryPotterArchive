"use client"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Slider from "react-slick"

import { HarryPotterCharacters } from "@/types/harryPotterCharacterBrief.type"

import Loader from "../Loader"
import NextArrow from "../NextArrow"
import PrevArrow from "../PrevArrow"

function CharacterList() {
  const fecthCharacters = async () => {
    const response = await axios.get(
      "https://potterhead-api.vercel.app/api/characters"
    )
    const filteredData = response.data.filter(
      (character: HarryPotterCharacters) => character.image !== ""
    )
    return filteredData
  }

  const {
    data: characters,
    isPending,
    isError,
  } = useQuery<HarryPotterCharacters[]>({
    queryKey: ["fetchCharacters"],
    queryFn: fecthCharacters,
    gcTime: 8 * 60 * 1000,
  })

  if (isPending) {
    return <Loader />
  } else if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다.</div>
  } else {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: characters && characters?.length % 2 === 0 ? 2 : 3,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    }
    return (
      <div className="relative w-full">
        <Slider {...settings}>
          {characters &&
            characters?.map((character) => (
              <Link href={`/characters/${character.name}`} key={character.id}>
                <Image
                  src={character.image || "/src/assets/defaultImg.jpg"}
                  alt={character.name}
                  width={191}
                  height={260}
                  className="h-[260px]"
                />
                <h3 className="text-s absolute bottom-5 ml-3 text-gray-50">
                  {character.name}
                </h3>
              </Link>
            ))}
        </Slider>
      </div>
    )
  }
}
export default CharacterList
