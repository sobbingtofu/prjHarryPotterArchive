"use client"

import React, { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { EffectCoverflow, Mousewheel, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { tHarryPotterMovieBrief } from "@/types/harryPotterMovieBrief.type"

import Loader from "../Loader"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "./style.css"

import Image from "next/image"
import Link from "next/link"
import zustandStore from "@/zustand/zustandStore"

function MovieList() {
  const currentOnFocusMovie = zustandStore((state) => state.currentOnFocusMovie)
  const setCurrentOnFocusMovie = zustandStore(
    (state) => state.setCurrentOnFocusMovie
  )

  const swiperRef = useRef(null)

  const fecthMovies = async () => {
    const response = await axios.get(
      "https://potterhead-api.vercel.app/api/movies"
    )

    return response.data
  }

  const {
    data: movies,
    isPending,
    isError,
  } = useQuery<tHarryPotterMovieBrief[]>({
    queryKey: ["fetchMovies"],
    queryFn: fecthMovies,
    gcTime: 8 * 60 * 1000, // 8분
  })

  useEffect(() => {
    setCurrentOnFocusMovie(1)
    console.log(currentOnFocusMovie)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isPending) {
    return <Loader />
  } else if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다.</div>
  } else {
    return (
      <>
        <p className="mt-2 font-semibold">
          {movies[currentOnFocusMovie - 1].title}
        </p>
        <div className="w-f">
          <Swiper
            ref={swiperRef}
            effect={"coverflow"}
            grabCursor={false}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 90,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 0.45,
            }}
            pagination={{
              clickable: true,
            }}
            mousewheel={true}
            modules={[EffectCoverflow, Pagination, Mousewheel]}
            onSlideChange={(swiper) =>
              setCurrentOnFocusMovie(swiper.activeIndex + 1)
            }
          >
            {movies.map((movie) => {
              return (
                <SwiperSlide key={movie.serial}>
                  <Link href={`movies/${movie.serial}`}>
                    <Image
                      src={movie.poster}
                      width={478}
                      height={404}
                      alt={movie.title}
                      priority
                      quality={60}
                    />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </>
    )
  }
}

export default MovieList
