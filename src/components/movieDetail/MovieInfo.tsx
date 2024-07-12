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
    <div className="flex">
      <Image src={info.poster} alt="movie poster" width={200} height={140} />
      <div>
        <h3>{info.title}</h3>
        <div>
          <p>개봉일{info.release_date}</p>
          <div>line</div>
          <p>상영시간{info.running_time}</p>
          <div>line</div>
          <p>이용가{info.rating}</p>
        </div>
        <div>line</div>
        <div>{info.summary}</div>
      </div>
      <div>line</div>
    </div>
  )
}

export default MovieInfo
