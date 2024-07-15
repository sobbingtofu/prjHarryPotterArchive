"use client"

import React from "react"

import { Movies } from "@/types/movies.type"
import Comments from "@/components/movieDetail/Comments"
import MovieInfo from "@/components/movieDetail/MovieInfo"
import MovieTrailer from "@/components/movieDetail/MovieTrailer"
import OtherSeries from "@/components/movieDetail/OtherSeries"
import { fetchMovies } from "@/app/api/movies.api"

const moviesDetailPage = ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const [movieInfo, setMovieInfo] = React.useState<Movies[]>([])
  const [allMoviesInfo, setAllMoviesInfo] = React.useState<Movies[]>([])

  React.useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const data = await fetchMovies()
        setAllMoviesInfo(data)
        setMovieInfo(data.filter((movie) => movie.serial === params.id))
      } catch (error) {
        console.log(error)
      }
    }
    getMovieInfo()
  }, [])

  return (
    <div className="h-full bg-[#171717] bg-[url('/bgimage.png')] bg-right-top bg-no-repeat">
      <div className="px-80 py-44">
        <MovieInfo movieInfo={movieInfo} />
        <MovieTrailer movieInfo={movieInfo} />
        <OtherSeries serial={params.id} allMoviesInfo={allMoviesInfo} />
        <Comments serial={params.id} />
      </div>
    </div>
  )
}

export default moviesDetailPage
