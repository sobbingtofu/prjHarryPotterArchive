import React from "react"
import Image from "next/image"

import { Movies } from "@/types/movies.type"

interface MovieInfoProps {
  movieInfo: Movies[]
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieInfo }) => {
  if (movieInfo.length === 0) {
    return
  }
  const info = movieInfo[0]

  return (
    <div className="flex w-[72rem]">
      <Image src={info.poster} alt="movie poster" width={450} height={310} />
      <div className="ml-2 mt-16 w-2/5 text-white">
        <h3 className="mb-6 text-4xl font-bold">{info.title}</h3>
        <div className="flex items-center text-sm">
          <p className="flex gap-1">
            개봉일<span className="font-bold">{info.release_date}</span>
          </p>
          <div className="mx-3 h-4 w-0.5 bg-white"></div>
          <p className="flex gap-1">
            상영시간<span className="font-bold">{info.running_time}</span>
          </p>
          <div className="mx-3 h-4 w-0.5 bg-white"></div>
          <p className="mt-1 flex gap-1">
            이용가<span className="font-bold">{info.rating}</span>
          </p>
        </div>
        <div className="my-8 h-0.5 bg-[#3A3837]"></div>
        <div className="text-sm">{info.summary}</div>
      </div>
    </div>
  )
}

export default MovieInfo
