import React from "react"
import Link from "next/link"

function HouseTestBanner() {
  return (
    <div className="mb-14 mt-12">
      <Link href="/house-test" className="flex w-full justify-center">
        <div className="bg-houseties group relative inline-flex h-[140px] w-[90%] cursor-pointer items-center justify-start rounded-2xl bg-cover bg-center transition-all">
          <div className="z-1 absolute left-0 h-full w-0 rounded-2xl bg-[#00000087] transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"></div>
          <div className="z-10 w-full text-white transition-colors duration-300 ease-in-out group-hover:text-white">
            <div className="ml-24 mt-8 text-lg font-semibold transition-transform duration-300 ease-in-out group-hover:-translate-x-6">
              <p>나는 어떤 기숙사일까?</p>
              <p>해리포터 기숙사 테스트로 알아보자!</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HouseTestBanner
