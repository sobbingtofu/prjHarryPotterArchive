import React, { PropsWithChildren } from "react"

function Page({ children }: PropsWithChildren) {
  return (
    <main className="container mx-auto min-h-[800px] max-w-[1228px] px-5 py-10 scrollbar-hide">
      {children}
    </main>
  )
}

export default Page
