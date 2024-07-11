"use server"

import { CharacterType } from "../../../../types/characterTypes"
import { ChracterDataType } from "./page"

const baseURL = process.env.BASE_URL

export const getCharacterData = async (name: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/characters/${name}`)
    if (!response.ok) {
      throw new Error("Failed to fetch data from internal API")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const getHouseFilteredData = async (house: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/houses/${house}`)
    if (!response.ok) {
      throw new Error("Failed to fetch data from internal API house!")
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const getOtherCharacterData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/characters`)
    if (!response.ok) {
      throw new Error("Failed to fetch data from internal API all!")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const getAll = async (house: string) => {
  const response = await (
    await fetch("https://potterhead-api.vercel.app/api/characters")
  ).json()

  const mappingData: ChracterDataType[] = response.map(
    (character: CharacterType) => ({
      id: character.id,
      name: character.name,
      species: character.species,
      house: character.house,
      dateOfBirth: character.dateOfBirth,
      wand: character.wand,
      image: character.image,
    })
  )

  const filteredData = mappingData.filter(
    (data) => data.image !== "" && data.house !== house
  )

  return filteredData
}
