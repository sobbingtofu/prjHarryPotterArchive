import { create } from "zustand"

import { tZustandStore } from "@/types/zustandstore.type"

// 주스탠드 스토어 변경 시 type에서도 적절히 변형시켜줘야 함
const zustandStore = create<tZustandStore>((set) => ({
  arrangeOption: "latest",
  setArrangeToLatest: () => set((state) => ({ arrangeOption: "latest" })),
  setArrangeToLikes: () => set((state) => ({ arrangeOption: "likes" })),
  currentOnFocusMovie: 1,
  setCurrentOnFocusMovie: (amount) =>
    set((state) => ({
      currentOnFocusMovie: state.currentOnFocusMovie + amount,
    })),
}))

export default zustandStore
