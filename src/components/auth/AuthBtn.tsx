import React from "react"
import Link from "next/link"

const AuthBtn = () => {
  return (
    <div className="gap-4flex flex-col gap-4">
      <button
        type="button"
        className="w-full rounded-md bg-blue-400 p-2 text-white"
      >
        <Link href="auth/i/login"> 로그인 </Link>
      </button>
      <button
        type="button"
        className="w-full rounded-md bg-blue-400 p-2 text-white"
      >
        <Link href="auth/i/signup">회원가입 </Link>
      </button>
    </div>
  )
}

export default AuthBtn
