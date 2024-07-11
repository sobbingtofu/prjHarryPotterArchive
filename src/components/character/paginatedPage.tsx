"use client"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import Slider from "react-slick"

import { getAll } from "@/app/characters/[slug]/actions"
import { ChracterDataType } from "@/app/characters/[slug]/page"

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

const fetchFilteredHouseData = async (house: string) => {
  const response = await (await fetch(`/api/houses/${house}`)).json()
  return response
}
const fetchOtherCharacters = async (house: string) => {
  const response = await getAll(house)
  return response
}

interface HouseCarouselProps {
  house: string
  type: string
}

const HouseCarousel = ({ house, type }: HouseCarouselProps) => {
  const { data, isFetched } = useQuery<ChracterDataType[]>({
    queryKey: type === "house" ? ["getHouse-data"] : ["getOhter-data"],
    queryFn: () => {
      if (type === "house") {
        return fetchFilteredHouseData(house)
      } else {
        return fetchOtherCharacters(house)
      }
    },
  })

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  if (!isFetched) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.id}>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="h-[150px] w-[150px]"
            />
            <h3>{item.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HouseCarousel
