// 영화 정보 불러오는거 관련 api
import { Movies } from "@/types/movies.type"

// 영화 정보 불러오는거 관련 api
export const fetchMovies = async (): Promise<Movies[]> => {
  const data = await fetch("https://potterhead-api.vercel.app/api/movies")
  return data.json()
}
