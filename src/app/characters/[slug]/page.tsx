import React from "react"
import Image from "next/image"

import HouseCarousel from "@/components/character/paginatedPage"
import Page from "@/components/Page"

import { getCharacterData } from "./actions"

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

async function CharacterPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const data = await getCharacterData(slug)

  return (
    <main
      className="h-full w-full bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: 'url("/bgimage.png")' }}
    >
      <section className="mx-auto flex w-1/2 items-center justify-center gap-10 *:text-white">
        <div>
          <Image
            src={data?.image}
            alt={data?.name}
            width={150}
            height={150}
            priority
            className="size-[180px] rounded-full object-cover"
            quality={100}
          />
        </div>
        <div className="flex w-[50%] flex-col">
          <h1 className="mb-2 text-2xl font-bold">{data?.name}</h1>
          <div className="flex gap-2">
            <p className="text-xs">
              기숙사
              <span className="text-sm font-semibold">{data?.house}</span>
            </p>
            <p className="text-xs">
              | 종족
              <span className="ml-1 text-sm font-semibold">
                {data?.species}
              </span>
            </p>
            <p className="text-xs">
              | 생년월일
              <span className="ml-1 text-sm font-semibold">
                {data?.dateOfBirth}
              </span>
            </p>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <div>
            <p className="text-sm font-semibold">지팡이</p>
            <ul className="*:ml-5 *:list-disc *:text-xs">
              <li>
                wood: <span>{data?.wand.wood}</span>
              </li>
              <li>
                core: <span>{data?.wand.core}</span>
              </li>
              <li>
                길이: <span>{data?.wand.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 *:text-white sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <h2 className="mb-2 text-lg font-semibold">
          같은 기숙사 다른 캐릭터 보기
        </h2>
        <HouseCarousel house={data?.house} type="house" />
      </section>
      <section className="mx-auto mt-8 *:text-white sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <h2 className="mb-2 text-lg font-semibold">다른 캐릭터 보기</h2>
        <HouseCarousel house={data?.house} type="other" />
      </section>
    </main>
  )
}

export default CharacterPage
