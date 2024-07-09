import React from "react"
import Image from "next/image"

import Page from "@/components/Page"

import {
  getAll,
  getCharacterData,
  getHouseFilteredData,
  getOtherCharacterData,
} from "./actions"

export interface ChracterDataType {
  id: string
  name: string
  species: string
  house: string
  dateOfBirth: string
  wand: {
    wood: string
    core: string
    length: number
  }
  image: string
}

// type HouseType = "Gryffindor" | "Hufflepuff" | "Ravenclaw" | "Slytherin"

async function CharacterPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data: ChracterDataType = await getCharacterData(slug)
  const houseFilteredData: ChracterDataType[] = await getHouseFilteredData(
    data.house
  )
  const getOtherData = await getAll(data.house)

  return (
    <Page>
      <section>
        <div>
          <Image src={data.image} alt={data.name} width={200} height={200} />
          <p>{data.name}</p>
          <p>{data.house}</p>
          <p>{data.species}</p>
          <p>{data.dateOfBirth}</p>
        </div>
      </section>
      <section className="mt-24">
        <div className="flex w-full flex-wrap">
          {houseFilteredData.map((data) => {
            return (
              <div key={data.id}>
                <Image
                  src={data.image}
                  alt={data.name}
                  width={100}
                  height={100}
                />
                <p>{data.name}</p>
              </div>
            )
          })}
        </div>
      </section>
      <section className="mt-28 flex flex-wrap">
        {getOtherData.map((data) => (
          <div key={data.id}>
            <Image src={data.image} alt={data.name} width={100} height={100} />
            <p>{data.name}</p>
          </div>
        ))}
      </section>
    </Page>
  )
}

export default CharacterPage
