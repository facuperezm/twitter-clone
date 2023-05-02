import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full overflow-y-scroll border-x border-zinc-700 md:max-w-[598px]">
        {props.children}
      </div>
    </main>
  );
};
