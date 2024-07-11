import { NextResponse } from "next/server"

import { CharacterType } from "../../../../../types/characterTypes"

const baseURL = process.env.BASE_URL

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params

  try {
    const response: CharacterType[] = await (
      await fetch(`${baseURL}/api/houses/${slug}`)
    ).json()

    const filteredData = response.filter((data: CharacterType) =>
      Boolean(data.image)
    )

    return NextResponse.json(filteredData)
  } catch (error) {
    return NextResponse.json({ error: "fail fetch!" }, { status: 500 })
  }
}
