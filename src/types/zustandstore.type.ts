export type tZustandStore = {
  arrangeOption: "latest" | "likes"
  setArrangeToLatest: () => void
  setArrangeToLikes: () => void
  currentOnFocusMovie: number
  setCurrentOnFocusMovie: (arg0: number) => void
}
