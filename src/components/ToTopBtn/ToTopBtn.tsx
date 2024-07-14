"use client"

function ToTopBtn() {
  return (
    <button
      className="fixed bottom-10 right-10 h-[50px] w-[50px] rounded-[100%] bg-slate-300 transition-transform duration-300 hover:-translate-y-2"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }}
    >
      ↑
    </button>
  )
}

export default ToTopBtn
