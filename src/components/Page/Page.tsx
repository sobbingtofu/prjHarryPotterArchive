import React, { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return (
    <main className="container mx-auto max-w-[1024px] px-5 py-20">
      {children}
    </main>
  );
}

export default Page;
