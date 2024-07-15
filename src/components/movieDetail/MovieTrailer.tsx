import React from "react"
import ReactPlayer from "react-player"

import { Movies } from "@/types/movies.type"

interface MovieTrailerProps {
  movieInfo: Movies[]
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ movieInfo }) => {
  if (movieInfo.length === 0) {
    return
  }

  return (
    <div className="mb-32">
      <div className="w-6/7 mb-32 mt-24 h-0.5 bg-[#252525]"></div>
      <div>
        <h3 className="mb-4 text-2xl font-bold text-white">
          이 시리즈의 트레일러 보기
        </h3>
        <div className="h-[28rem]">
          <ReactPlayer url={movieInfo[0].trailer} width="100%" height="100%" />
        </div>
      </div>
    </div>
  )
}

export default MovieTrailer
