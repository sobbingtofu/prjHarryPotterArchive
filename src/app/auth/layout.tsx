import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
  modal: ReactNode
}

const layout = ({ children, modal }: Props) => {
  return (
    <div>
      {modal}
      {children}
    </div>
  )
}

export default layout
