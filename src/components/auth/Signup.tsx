"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

import supabase from "../../../lib/supabase"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState({
    password: "",
    passwordConfirm: "",
  })

  const router = useRouter()
  const onClickClose = () => {
    router.back()
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 6) {
      setError({
        ...error,
        password: "비밀번호는 최소 6자 이상입니다.",
      })
    } else {
      setError({
        ...error,
        password: "",
      })
    }
  }

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email === "" || password === "" || passwordConfirm === "") {
      Swal.fire({
        text: "모든항목을 입력해주세요!",
        confirmButtonColor: "#000000",
      })
      return
    }

    if (password !== passwordConfirm) {
      Swal.fire({
        text: "비밀번호와 비밀번호 확인이 일치하지 않습니다!",
        confirmButtonColor: "#000000",
      })
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return Swal.fire({
        text: error.message,
        confirmButtonColor: "#000000",
      })
    }

    const user = data.user
    if (user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ user_id: user.id, name, email, password }])

      if (insertError) {
        return Swal.fire({
          text: insertError.message,
          confirmButtonColor: "#000000",
        })
      }
    }

    Swal.fire({
      text: "회원가입이 완료되었습니다!",
      confirmButtonColor: "#000000",
    })

    router.replace("/")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="absolute h-3/4 w-5/12 flex-col items-center justify-center rounded-lg border bg-white p-11">
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
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center gap-5"
        >
          <p className="mb-6 text-2xl font-bold">회원가입</p>

          <div className="relative w-80">
            <input
              type="text"
              id="name"
              className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
              placeholder="이름"
              value={name}
              onChange={onChangeName}
            />
            <label
              htmlFor="email"
              className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              이름
            </label>
          </div>

          <div className="relative w-80">
            <input
              type="email"
              id="email"
              placeholder="이메일"
              className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={onChangeEmail}
            />
            <label
              htmlFor="email"
              className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              이메일
            </label>
          </div>

          <div className="relative w-80">
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
              className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              비밀번호
            </label>
          </div>

          {error.password && <p className="text-red-500">{error.password}</p>}

          <div className="relative w-80">
            <input
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호 확인"
              className="peer mt-2 h-12 w-full rounded-md border-2 border-gray-300 p-1 placeholder-transparent focus:border-blue-500 focus:outline-none"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            <label
              htmlFor="password"
              className="absolute -top-3.5 left-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              비밀번호 확인
            </label>
          </div>
          <button
            type="submit"
            className="h-11 w-80 rounded-md bg-black p-2 text-white transition-transform duration-300 hover:-translate-y-1"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
