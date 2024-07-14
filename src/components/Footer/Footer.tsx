import React from "react"

function Footer() {
  return (
    <div className="flex bg-[#212121]">
      <div className="container mx-auto flex max-w-[1228px] flex-col gap-2 px-5 py-10 text-gray-500">
        <h3 className="text-xl font-bold">Hogwarts Express</h3>
        <p className="text-md italic">
          Next.js + HarryPotter API(potterhead-api.vercel.app/)
        </p>
        <p className="mt-5 text-sm">
          이혜진 github.com/hyejinleeee?tab=repositories
        </p>
        <p className="text-sm">윤기준 github.com/sobbingtofu</p>
        <p className="text-sm">강희진 github.com/raccoonboy0803</p>
        <p className="text-sm">추유선 github.com/jamie240417</p>
        <p className="text-sm">최연 github.com/Cameron-86 </p>
      </div>
    </div>
  )
}

export default Footer
