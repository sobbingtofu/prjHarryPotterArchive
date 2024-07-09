import { NextResponse } from "next/server"

const baseURL = process.env.BASE_URL

export const GET = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  try {
    const response = await (
      await fetch(`${baseURL}/api/characters/${slug}`)
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
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
