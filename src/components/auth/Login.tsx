"use client"

import React from "react"
import { redirect, useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter()
  const onClickClose = () => {
    router.back()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="absolute h-64 w-6/12 flex-col items-center justify-center border bg-white p-11">
        로그인!!!
        <button onClick={onClickClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-4 h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <label htmlFor="email" className="mr-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          className="rounded-md border-2 border-gray-300 p-1"
        />
        <label htmlFor="password" className="mr-2">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          className="rounded-md border-2 border-gray-300 p-1"
        />
        <button
          type="button"
          className="w-full rounded-md bg-black p-2 text-white"
        >
          로그인하러 가기
        </button>
      </div>
    </div>
  )
}

export default Login
