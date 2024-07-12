import CharacterList from "@/components/CharacterList"
import MovieList from "@/components/MovieList"
import Page from "@/components/Page"

export default function Home() {
  return (
    <Page>
      <h1 className="mb-8 text-4xl font-black">해리포터 영화 시리즈</h1>
      <MovieList />
      <h1 className="mb-8 text-4xl font-black">
        해리포터의 인물들을 만나보세요
      </h1>
      <CharacterList />
    </Page>
  )
}
