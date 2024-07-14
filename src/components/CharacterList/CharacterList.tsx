"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import zustandStore from "@/zustand/zustandStore"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { HarryPotterCharacters } from "@/types/harryPotterCharacterBrief.type"

import Loader from "../Loader"

function CharacterList() {
  const characterSearchInputValue = zustandStore(
    (state) => state.characterSearchInputValue
  )
  const setShowCharacterSearchInput = zustandStore(
    (state) => state.setShowCharacterSearchInput
  )

  const showCharacterSearchInput = zustandStore(
    (state) => state.showCharacterSearchInput
  )

  const fecthCharacters = async () => {
    const response = await axios.get(
      "https://potterhead-api.vercel.app/api/characters"
    )
    const filteredData = response.data.filter(
      (character: HarryPotterCharacters) => character.image !== ""
    )
    return filteredData
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

  useEffect(() => {
    if (characters) {
      setShowCharacterSearchInput(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters])

  if (isPending) {
    return <Loader />
  }
  if (isError) {
    return <div>데이터 불러오던 중 오류가 발생했습니다.</div>
  }

  const filteredCharacters =
    characterSearchInputValue == ""
      ? characters
      : characters.filter((character) => {
          return (
            character.name
              .toLowerCase()
              .includes(characterSearchInputValue.toLowerCase()) ||
            character.actor
              .toLowerCase()
              .includes(characterSearchInputValue.toLowerCase()) ||
            character.house
              .toLowerCase()
              .includes(characterSearchInputValue.toLowerCase())
          )
        })
  return (
    <div className="grid min-h-[320px] grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-x-12 lg:grid-cols-4 lg:gap-x-24">
      {filteredCharacters &&
        filteredCharacters?.map((character) => (
          <Link key={character.id} href={`/characters/${character.name}`}>
            <div className="relative flex h-[250px] w-full flex-col rounded-3xl shadow-2xl transition-all duration-300 hover:scale-110 sm:h-[320px] md:h-[320px] lg:sm:h-[320px]">
              <Image
                src={character.image || "/src/assets/defaultImg.jpg"}
                alt={character.name}
                fill
                className="w-auto rounded-3xl object-cover"
                sizes="100px"
              />

              <h3 className="text-s absolute bottom-4 mx-auto w-full text-center text-gray-50">
                {character.name}
              </h3>
            </div>
          </Link>
        ))}
      {filteredCharacters.length == 0 ? (
        <p className="mt-7 font-bold text-gray-500">검색된 결과가 없습니다</p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default CharacterList
