import React, { PropsWithChildren } from "react"

function Page({ children }: PropsWithChildren) {
  return (
    <main className="scrollbar-hide container mx-auto max-w-[1228px] px-5 py-20">
      {children}
    </main>
  )
}

export default Page
