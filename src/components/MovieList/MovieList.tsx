"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function MovieList() {
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
  } = useQuery({
    queryKey: ["fetchMovies"],
    // 쿼리 키를 기준으로 케싱됨!
    // 같은 데이터를 가져온다면 같은 쿼리키 사용하자.
    queryFn: fecthMovies,
  })

  if (isPending) {
    return <div>로딩중입니다...</div>
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>
  } else {
    console.log(movies)
    return (
      <div>
        <h3>TanStack Query</h3>
      </div>
    )
  }
}

export default MovieList
