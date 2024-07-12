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
  // 배열이 비었는지 아닌지는 run타임에 체크, 아까 떴던건 type 체크라 뜸
  // 아래까지 안읽음

  return (
    <div>
      <h3>이 시리즈의 트레일러 보기</h3>
      <ReactPlayer url={movieInfo[0].trailer} />
    </div>
  )
}

export default MovieTrailer
