"use server"

import { NextResponse } from "next/server"

import { CharacterType } from "../../../../types/characterTypes"
import { ChracterDataType } from "./page"

const baseURL = process.env.BASE_URL

export const getCharacterData = async (character: string) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 300000))
    const response = await (
      await fetch(`${baseURL}/api/characters/${character}`)
    ).json()

    const { id, name, species, house, dateOfBirth, wand, image } = response
    const data = {
      id,
      name,
      species,
      house,
      dateOfBirth,
      wand,
      image,
    }

    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

export const getHouseFilteredData = async (house: string) => {
  const response: CharacterType[] = await (
    await fetch(`${baseURL}/api/houses/${house}`)
  ).json()

  const filteredData = response.filter((data: CharacterType) =>
    Boolean(data.image)
  )

  return filteredData
}

export const getAll = async (house: string) => {
  const response = await (await fetch(`${baseURL}/api/characters`)).json()

  const mappingData: CharacterType[] = response.map(
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

export const getOtherCharacterData = async () => {
  try {
    const response = await fetch(`${baseURL}/api/characters`)
    if (!response.ok) {
      throw new Error("Failed to fetch data from internal API all!")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
