"use client"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import Slider from "react-slick"

import {
  getAll,
  getHouseFilteredData,
  getOtherCharacterData,
} from "@/app/characters/[slug]/actions"
import { ChracterDataType } from "@/app/characters/[slug]/page"

import { CharacterType } from "../../../types/characterTypes"

const NextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "100px",
      }}
      onClick={onClick}
    />
  )
}

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "100px",
      }}
      onClick={onClick}
    />
  )
}

interface HouseCarouselProps {
  house: string
  type?: string
}

const HouseCarousel = ({ house, type }: HouseCarouselProps) => {
  const { data, isFetched } = useQuery<CharacterType[]>({
    queryKey: type === "house" ? ["getHouse-data"] : ["getOhter-data"],
    queryFn: () => {
      if (type === "house") {
        return getHouseFilteredData(house)
      } else {
        return getAll(house)
      }
    },
  })

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  if (!isFetched) {
    return <p className="animate-pulse">Loading...</p>
  }

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {data &&
          data?.map((item) => (
            <Link href={`/characters/${item.name}`} key={item.id}>
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={200}
                className="h-[180px]"
              />
              <h3 className="absolute bottom-5 text-xs">{item.name}</h3>
            </Link>
          ))}
      </Slider>
    </div>
  )
}

export default HouseCarousel
