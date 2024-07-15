import CharacterList from "@/components/CharacterList"
import CharacterSearchInput from "@/components/CharacterSearchInput"
import HouseTestBanner from "@/components/HouseTestBanner"
import MovieList from "@/components/MovieList"
import Page from "@/components/Page"
import ToTopBtn from "@/components/ToTopBtn"

export default function Home() {
  return (
    <main
      className="h-full w-full bg-[length:100%_auto] bg-top bg-no-repeat"
      style={{ backgroundImage: 'url("/bgimage.png")' }}
    >
      <ToTopBtn />
      <Page>
        <h1 className="mb-1 text-3xl font-black text-white">
          해리포터 영화 시리즈
        </h1>
        <MovieList />
        <HouseTestBanner />
        <h1 className="mb-5 mt-8 text-3xl font-black text-white">
          해리포터의 인물들을 만나보세요
        </h1>
        <CharacterSearchInput />
        <CharacterList />
      </Page>
    </main>
  )
}
