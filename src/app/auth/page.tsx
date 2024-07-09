import React from "react"
import Image from "next/image"

import AuthBtn from "@/components/auth/AuthBtn"

import loginImage from "../../../public/login.jpeg"

const AuthPage = () => {
  return (
    <div className="m-auto flex h-screen items-center justify-center">
      <div className="relative h-60 w-60 md:h-56 md:w-48">
        <Image src={loginImage} fill alt="unsplash image" />
      </div>
      <AuthBtn />
    </div>
  )
}

export default AuthPage
