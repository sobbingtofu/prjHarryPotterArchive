"use client"

import React, { useRef } from "react"
import { useRouter } from "next/navigation"

import supabase from "../../../lib/supabase"

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("로그인완료")
    router.replace("/")
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="h-64 w-6/12 flex-col items-center justify-center border bg-white p-11"
      >
        <p>로그인</p>

        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="이메일을 입력하세요."
          className="rounded-md border-2 border-gray-300 p-1"
        />

        <input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          className="rounded-md border-2 border-gray-300 p-1"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black p-2 text-white"
        >
          로그인
        </button>
      </form>
    </>
  )
}

export default Login
