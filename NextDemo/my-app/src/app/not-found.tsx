import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">页面不存在</h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          这个地址没有对应的页面。检查链接，或回到首页继续浏览。
        </p>
        <Link
          href="/"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          回到首页
        </Link>
      </main>
    </div>
  );
}
