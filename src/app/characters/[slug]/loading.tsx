export default function LoadingCharacter() {
  return (
    <main
      className="h-full w-full animate-pulse bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: 'url("/bgimage.png")' }}
    >
      <section className="mx-auto flex w-1/2 items-center justify-center gap-10 *:text-white">
        <div className="size-[180px] rounded-full bg-neutral-400" />
        <div className="flex w-[50%] flex-col">
          <h1 className="mb-2 h-5 text-2xl font-bold"></h1>
          <div className="flex gap-2">
            <p className="text-xs">기숙사</p>
            <p className="text-xs">| 종족</p>
            <p className="text-xs">| 생년월일</p>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <div>
            <p className="text-sm font-semibold">지팡이</p>
            <ul className="*:ml-5 *:list-disc *:text-xs">
              <li>wood:</li>
              <li>core:</li>
              <li>길이:</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 *:text-white sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <h2 className="mb-2 text-lg font-semibold">
          같은 기숙사 다른 캐릭터 보기
        </h2>
      </section>
      <section className="mx-auto mt-8 *:text-white sm:w-[80%] md:w-[70%] lg:w-[50%]">
        <h2 className="mb-2 text-lg font-semibold">다른 캐릭터 보기</h2>
      </section>
    </main>
  )
}
