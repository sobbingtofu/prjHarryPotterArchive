"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { HarryPotterCharacters } from "@/types/harryPotterCharacterBrief.type"

import Loader from "../Loader"

function CharacterList() {
  const fecthCharacters = async () => {
    const response = await axios.get(
      "https://potterhead-api.vercel.app/api/characters"
    )
    return response.data
  }

  const {
    data: characters,
    isPending,
    isError,
  } = useQuery<HarryPotterCharacters[]>({
    queryKey: ["fetchCharacters"],
    queryFn: fecthCharacters,
    gcTime: 8 * 60 * 1000,
  })

  if (isPending) {
    return <Loader />
  } else if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다.</div>
  } else {
    console.log(characters)
    return (
      <div className="flex">
        {characters.map((character, index) => {
          return <div key={index}>{character.name}</div>
        })}
      </div>
    )
  }
}
export default CharacterList
