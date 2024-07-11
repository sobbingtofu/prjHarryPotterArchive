"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Session } from "@supabase/supabase-js"
import Swal from "sweetalert2"

import supabase from "../../../lib/supabase"

function Header() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    })

    if (result.isConfirmed) {
      await supabase.auth.signOut()
      setSession(null)
      Swal.fire({
        title: "로그아웃 완료",
        icon: "success",
      })
    }
  }

  return (
    <div className="container mx-auto max-w-[1024px] px-5">
      <div className="flex flex-row justify-between py-4">
        <Link href="/">
          <div>로고</div>
        </Link>

        <div className="ml-16 flex flex-row gap-20">
          <Link href="/movies">
            <p>영화</p>
          </Link>

          <Link href="/characters">
            <p>인물</p>
          </Link>
          <Link href="/house-test">
            <p>기숙사 테스트</p>
          </Link>
        </div>
        {session ? (
          <button onClick={handleLogout} className="flex items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A11.955 11.955 0 0112 15c2.773 0 5.304.94 7.121 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 5a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7z"
              />
            </svg>
            로그아웃
          </button>
        ) : (
          <Link href="/auth">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A11.955 11.955 0 0112 15c2.773 0 5.304.94 7.121 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 5a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7z"
                />
              </svg>
              로그인
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
