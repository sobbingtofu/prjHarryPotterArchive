import Link from "next/link"

function Header() {
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
        <Link href="/auth">
          <p>로그인</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
