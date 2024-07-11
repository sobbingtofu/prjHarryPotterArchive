import React from "react"

import Login from "@/components/auth/Login"
import LoginText from "@/components/auth/LoginText"
import SignupBtn from "@/components/auth/SignupBtn"

const AuthPage = () => {
  return (
    <>
      <div className="bg-castle relative flex h-screen items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex w-full max-w-4xl">
          <div className="flex w-1/2">
            <LoginText />
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <Login />
            <SignupBtn />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthPage
