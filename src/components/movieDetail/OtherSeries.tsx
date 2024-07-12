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
    .map(
      (movie) => ({
        serial: movie.serial,
        title: movie.title,
        poster: movie.poster,
      })
      // 순회 한번에 모든걸 다 하려 하지 말자, 알아보기도 어려움 filter 후 -> map
    )

  return (
    <div>
      <h3>다른 시리즈 보기</h3>
      <div>
        <ul className="-ml-4">
          {otherMovies.map((movie) => {
            return (
              <li key={movie.serial} className="basis-1/7 w-48 pl-4">
                <Link href={`/movies/${movie.serial}`}>
                  <Image
                    src={movie.poster}
                    alt={`${movie.serial}serial-posterImg`}
                    width={220}
                    height={280}
                  />
                  {movie.title}
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
