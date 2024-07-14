import Image from "next/image"
import Link from "next/link"

import { Movies } from "@/types/movies.type"

interface OtherSeriesProps {
  serial: string
  allMoviesInfo: Movies[]
}

const OtherSeries: React.FC<OtherSeriesProps> = ({ serial, allMoviesInfo }) => {
  if (allMoviesInfo.length === 0) {
    return
  }
  const otherMovies = allMoviesInfo
    .filter((movie) => movie.serial !== serial)
    .map((movie) => ({
      serial: movie.serial,
      title: movie.title,
      poster: movie.poster,
    }))

  return (
    <div className="relative mb-[35rem] mt-32 text-white">
      <div className="absolute left-[-7rem]">
        <h3 className="mb-4 ml-12 text-2xl font-bold">다른 시리즈 보기</h3>
        <ul className="flex">
          {otherMovies.map((movie) => {
            return (
              <li
                key={movie.serial}
                className="h-[15rem] w-full duration-200 ease-in-out hover:scale-110"
              >
                <Link href={`/movies/${movie.serial}`}>
                  <div className="m-1 flex h-full w-[10rem] flex-col items-center">
                    <Image
                      src={movie.poster}
                      alt={`${movie.serial}serial-posterImg`}
                      width={240}
                      height={300}
                    />
                    <span className="ml-2 text-sm">{movie.title}</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default OtherSeries
