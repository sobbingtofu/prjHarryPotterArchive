"use client"

import React, { useRef } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

import supabase from "../../lib/supabase"

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password) {
      Swal.fire({
        text: "모든항목을 입력해주세요!",
        confirmButtonColor: "#000000",
      })
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Swal.fire({
        text: error.message,
        confirmButtonColor: "#000000",
      })
      return
    }

    Swal.fire({
      icon: "success",
      title: "로그인 완료",
      showConfirmButton: false,
      timer: 1500,
    })
    router.replace("/")
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex h-80 w-96 flex-col items-center justify-center gap-8 rounded-md border bg-white p-11"
      >
        <p className="block text-2xl font-bold">로그인</p>

        <div className="relative w-80">
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="이메일을 입력하세요."
            className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
          />
          <label
            htmlFor="email"
            className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            이메일을 입력하세요.
          </label>
        </div>

        <div className="relative w-80">
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="비밀번호"
            className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
          />
          <label
            htmlFor="password"
            className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >
            비밀번호를 입력하세요
          </label>
        </div>

        <button
          type="submit"
          className="h-20 w-80 rounded-md bg-black p-2 text-white transition-transform duration-300 hover:-translate-y-1"
        >
          로그인
        </button>
      </form>
    </>
  )
}

export default Login
