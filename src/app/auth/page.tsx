import React from "react"
import Image from "next/image"

import Login from "@/components/auth/Login"
import LoginText from "@/components/auth/LoginText"
import SignupBtn from "@/components/auth/SignupBtn"

const AuthPage = () => {
  return (
    <>
      <div className="bg-castle relative flex h-screen items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 ml-32 flex items-center">
          <LoginText />
          <div className="flex-col">
            <Login />
            <SignupBtn />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthPage

{
  /* <div className="relative h-60 w-60 md:h-56 md:w-48">
<Image src={loginImage} fill alt="unsplash image" />
</div> */
}
