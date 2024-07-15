import React from "react"

import HouseTestPage from "@/components/house-tests/page"

const page = () => {
  return (
    <main
      className="h-full w-full bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: 'url("/bgimage.png")' }}
    >
      <HouseTestPage />
    </main>
  )
}

export default page
