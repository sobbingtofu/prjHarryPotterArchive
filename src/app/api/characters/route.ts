import { NextResponse } from "next/server"

import { CharacterType } from "../../../../types/characterTypes"
import { ChracterDataType } from "../../characters/[slug]/page"

const baseURL = process.env.BASE_URL

export const GET = async () => {
  try {
    const response = await (await fetch(`${baseURL}/api/characters`)).json()

    const filteredData: ChracterDataType[] = response.map(
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

    return NextResponse.json(filteredData)
    // return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
