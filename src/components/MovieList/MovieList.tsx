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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다</div>
  }

  return (
    <div className="min-h-[65vh]">
      <p className="mt-2 border-black font-semibold text-white shadow-2xl">
        {currentOnFocusMovie}/8: &nbsp; {movies[currentOnFocusMovie - 1].title}
      </p>
      <div className="mx-auto w-[75%]">
        <div className="w-f">
          <Swiper
            // @ts-ignore - Custom property
            style={{
              // @ts-ignore - Custom property
              "--swiper-pagination-color": "#e1e1e1",
              // @ts-ignore - Custom property
              "--swiper-pagination-bullet-inactive-color": "#999999",
            }}
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
                    <div className="relative flex h-[628px] w-[478px] flex-col rounded-3xl shadow-2xl">
                      <Image
                        src={movie.poster}
                        fill
                        alt={movie.title}
                        priority
                        quality={60}
                        className="w-auto rounded-3xl object-cover"
                        sizes="404px"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default MovieList
