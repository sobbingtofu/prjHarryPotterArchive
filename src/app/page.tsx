import Image from "next/image"

import ArrangeToggle from "@/components/ArrangeToggle"
import MovieList from "@/components/MovieList"
import Page from "@/components/Page"

export default function Home() {
  return (
    <Page>
      <h1 className="mb-8 text-5xl font-black">영화 시리즈 소개</h1>
      <ArrangeToggle />
      <MovieList />
    </Page>
  )
}
