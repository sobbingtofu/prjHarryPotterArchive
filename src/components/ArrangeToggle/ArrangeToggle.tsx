"use client"

import React from "react"
import zustandStore from "@/zustand/zustandStore"

function ArrangeToggle() {
  const currentArrangeOption = zustandStore((state) => state.arrangeOption)
  const setArrangeToLatest = zustandStore((state) => state.setArrangeToLatest)
  const setArrangeToLikes = zustandStore((state) => state.setArrangeToLikes)

  console.log(currentArrangeOption)
  return (
    <div className="mb-8">
      <div className="flex w-[200px] justify-center gap-x-3 rounded-xl bg-slate-300 px-2 py-2">
        <button onClick={setArrangeToLatest}>
          <p
            className={
              currentArrangeOption == "latest"
                ? "rounded-md bg-slate-50 px-4 py-3 font-black text-gray-950"
                : "rounded-md px-4 py-3 font-black text-gray-500"
            }
          >
            최신순
          </p>
        </button>
        <button onClick={setArrangeToLikes}>
          <p
            className={
              currentArrangeOption == "likes"
                ? "rounded-md bg-slate-50 px-4 py-3 font-black text-gray-950"
                : "rounded-md px-4 py-3 font-black text-gray-500"
            }
          >
            인기순
          </p>
        </button>
      </div>
    </div>
  )
}

export default ArrangeToggle
