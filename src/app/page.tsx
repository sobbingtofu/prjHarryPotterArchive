import CharacterList from "@/components/CharacterList"
import CharacterSearchInput from "@/components/CharacterSearchInput"
import MovieList from "@/components/MovieList"
import Page from "@/components/Page"

export default function Home() {
  return (
    <main
      className="h-full w-full bg-[length:100%_auto] bg-top bg-no-repeat py-20"
      style={{ backgroundImage: 'url("/bgimage.png")' }}
    >
      <Page>
        <h1 className="mb-1 text-3xl font-black">해리포터 영화 시리즈</h1>
        <MovieList />
        <h1 className="mb-10 mt-8 text-3xl font-black">
          해리포터의 인물들을 만나보세요
        </h1>
        <CharacterSearchInput />
        <CharacterList />
      </Page>
    </main>
  )
}
