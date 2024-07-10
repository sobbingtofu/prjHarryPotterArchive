"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

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
      alert("모든 항목을 입력해주세요.")
      return
    }

    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return alert(error.message)
    }

    const user = data.user
    if (user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ user_id: user.id, name, email, password }])

      if (insertError) {
        return alert(insertError.message)
      }

      alert("회원가입이 완료되었습니다.")
      router.replace("/")
    }

    alert("회원가입이 완료되었습니다.")

    router.replace("/")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="absolute h-3/6 w-60 flex-col items-center justify-center rounded-lg border bg-white p-11">
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
          className="flex flex-col items-center justify-center gap-4"
        >
          <p>회원가입</p>
          <input
            type="text"
            id="name"
            className="rounded-md border-2 border-gray-300 p-1"
            placeholder="이름"
            value={name}
            onChange={onChangeName}
          />

          <input
            type="email"
            id="email"
            placeholder="이메일"
            className="rounded-md border-2 border-gray-300 p-1"
            value={email}
            onChange={onChangeEmail}
          />

          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className="rounded-md border-2 border-gray-300 p-1"
            value={password}
            onChange={onChangePassword}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
          <input
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호 확인"
            className="rounded-md border-2 border-gray-300 p-1"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-black p-2 text-white"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
