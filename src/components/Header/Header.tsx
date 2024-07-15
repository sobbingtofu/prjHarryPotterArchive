"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Session } from "@supabase/supabase-js"
import Swal from "sweetalert2"

import supabase from "../../lib/supabase"

function Header() {
  const [session, setSession] = useState<Session | null>(null)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)

      if (session?.user?.id) {
        fetchUserName(session.user.id)
      }
    }

    getSession()

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user?.id) {
        fetchUserName(session.user.id)
      }
    })
  }, [])

  const fetchUserName = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("user_id", userId)
      .single()

    if (error) {
      console.log("Error fetching user name:", error)
    } else {
      setUserName(data.name)
    }
  }

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
      setUserName("")
      Swal.fire({
        title: "로그아웃 완료",
        icon: "success",
      })
    }
  }

  return (
    <div className="container mx-auto max-w-[1920px] bg-[#171717] px-5 text-white">
      <div className="mx-8 flex flex-row justify-between py-4">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={240} height={50} />
        </Link>

        {session ? (
          <div className="flex items-center">
            <p className="mr-4">안녕하세요, {userName}님</p>
            <button onClick={handleLogout} className="flex items-center">
              <Image src="/user.svg" alt="user icon" width={30} height={30} />
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/auth">
            <p className="flex items-center">
              <Image src="/user.svg" alt="user icon" width={30} height={30} />
              로그인
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
