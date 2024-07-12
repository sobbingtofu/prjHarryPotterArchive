"use client"

import React, { useRef } from "react"
import zustandStore from "@/zustand/zustandStore"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { tHarryPotterMovieBrief } from "@/types/harryPotterMovieBrief.type"

import Loader from "../Loader"
import MovieCard from "../MovieCard"

function MovieList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const fecthMovies = async () => {
    const response = await axios.get(
      "https://potterhead-api.vercel.app/api/movies"
    )

    return response.data
  }

  const currentOnFocusMovie = zustandStore((state) => state.currentOnFocusMovie)
  const setCurrentOnFocusMovie = zustandStore(
    (state) => state.setCurrentOnFocusMovie
  )

  const {
    data: movies,
    isPending,
    isError,
  } = useQuery<tHarryPotterMovieBrief[]>({
    queryKey: ["fetchMovies"],
    queryFn: fecthMovies,
    gcTime: 8 * 60 * 1000, // 8분
  })

  if (isPending) {
    return <Loader />
  } else if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다.</div>
  } else {
    // 종스크롤을 횡스크롤로 변환해주는 함수
    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
      if (scrollContainerRef.current) {
        if (event.deltaY > 0) {
          if (currentOnFocusMovie < 8) {
            setCurrentOnFocusMovie(1)
          }
        } else {
          if (currentOnFocusMovie > 1) setCurrentOnFocusMovie(-1)
        }
      }
    }

    return (
      <div
        className="hover:scroll flex items-center justify-center overscroll-contain scrollbar-hide"
        ref={scrollContainerRef}
        onMouseOver={() => {
          document.body.style.overflowY = "hidden"
        }}
        onMouseLeave={() => {
          document.body.style.overflowY = "visible"
        }}
        onWheel={handleScroll}
      >
        {currentOnFocusMovie === 1 ? (
          <div className="min-w-[332px]"></div>
        ) : (
          <></>
        )}
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.title}
              movie={movie}
              level={
                currentOnFocusMovie == parseInt(movie.serial)
                  ? "primary"
                  : currentOnFocusMovie == parseInt(movie.serial) + 1
                    ? "subsidary"
                    : currentOnFocusMovie == parseInt(movie.serial) - 1
                      ? "subsidary"
                      : "none"
              }
            />
          )
        })}
        {currentOnFocusMovie === 8 ? <div className="min-w-[332px]" /> : <></>}
      </div>
    )
  }
}

export default MovieList
