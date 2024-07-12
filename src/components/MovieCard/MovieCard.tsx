import React, { PropsWithChildren } from "react"
import Image from "next/image"
import Link from "next/link"

import { movieCardProps } from "@/types/movieCardProps.type"

function MovieCard({ movie, level }: PropsWithChildren<movieCardProps>) {
  return (
    <Link href={`/movies/${movie.serial}`}>
      <div
        className={
          level === "none"
            ? "relative hidden"
            : level === "primary"
              ? "relative z-0 h-[886px] w-[664px]"
              : "relative z-0 h-[443px] w-[332px]"
        }
      >
        <Image
          fill
          alt={movie.title}
          src={movie.poster}
          className={level === "none" ? "hidden" : "object-contain"}
          unoptimized
          priority
        />
      </div>
    </Link>
  )
}

export default MovieCard
