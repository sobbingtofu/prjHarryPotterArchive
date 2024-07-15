import React from "react"
import Link from "next/link"

const SignupBtn = () => {
  return (
    <div className="mt-5 flex w-96 gap-16 rounded-md bg-white p-6">
      <p>아직 회원이 아니신가요?</p>
      <button
        type="button"
        className="w-28 rounded-md bg-black p-2 text-white transition-transform duration-300 hover:-translate-y-1"
      >
        <Link href="auth/i/signup">회원가입 </Link>
      </button>
    </div>
  )
}

export default SignupBtn
