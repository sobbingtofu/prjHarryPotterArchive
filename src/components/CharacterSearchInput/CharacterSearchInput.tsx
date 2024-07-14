"use client"

import { ChangeEvent, useCallback } from "react"
import zustandStore from "@/zustand/zustandStore"
import { debounce } from "lodash"

function CharacterSearchInput() {
  const showCharacterSearchInput = zustandStore(
    (state) => state.showCharacterSearchInput
  )

  const setCharacterSearchInputValue = zustandStore(
    (state) => state.setCharacterSearchInputValue
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleTextDebounce(event.target.value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextDebounce = useCallback(
    debounce((text) => setCharacterSearchInputValue(text), 200),
    []
  )
  if (showCharacterSearchInput) {
    return (
      <div className={showCharacterSearchInput ? `mb-7` : "hidden"}>
        <input
          className="w-96 rounded-lg bg-slate-100 px-4 py-2 shadow-inner"
          placeholder="인물 또는 배우의 이름을 검색해보세요"
          onChange={handleInputChange}
        />
      </div>
    )
  } else {
    return <></>
  }
}

export default CharacterSearchInput
