import React from "react"
import Link from "next/link"

const SignupBtn = () => {
  return (
    <div className="gap-4flex mt-5 w-6/12 flex-col bg-white p-6">
      <p>아직 회원이 아니신가요?</p>
      <button
        type="button"
        className="w-full rounded-md bg-blue-400 p-2 text-white"
      >
        <Link href="auth/i/signup">회원가입 </Link>
      </button>
    </div>
  )
}

export default SignupBtn
