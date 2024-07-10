"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Session } from "@supabase/supabase-js"

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
    await supabase.auth.signOut()
    setSession(null)
    alert("로그아웃 완료")
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
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <Link href="/auth">
            <p>로그인</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
