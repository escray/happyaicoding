import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Next.js",
  description:
    "Next.js 是基于 React 的全栈框架，用文件系统路由、服务端组件和内置优化来构建 Web 应用。",
};

const ideas = [
  {
    title: "文件系统路由",
    body: "文件夹就是路由。src/app/about/page.tsx 会公开成 /about，不需要单独写路由表。page.tsx 是这条路由自己的界面，layout.tsx 则是包在外面、切换页面时仍然保留的外壳。",
  },
  {
    title: "默认在服务端渲染",
    body: "页面默认是 React Server Component。Next.js 先在服务端跑组件、生成 HTML，浏览器第一次打开就能看到内容。不需要点击、输入这类交互的部分，不会打进客户端 JavaScript。",
  },
  {
    title: "用 Link 做页面跳转",
    body: "next/link 会在链接进入视口时预取下个页面。用户点下去时，路由在客户端切换，共享的 layout 不会整页刷新。",
  },
  {
    title: "数据和界面放在一起",
    body: "服务端组件里可以直接 await 数据，不必先把页面送到浏览器再发一次请求。需要改数据时，可以用 Server Actions 或 Route Handler 把接口也写在同一个项目里。",
  },
  {
    title: "内置的生产优化",
    body: "next/image 处理图片尺寸和格式，next/font 在构建时加载字体，Metadata API 生成 title 和 description。这些都是框架自带的，不用再接一套工具链。",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 sm:px-16">
        <Link href="/" className="inline-flex items-center">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          返回首页
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 pb-20 sm:px-16">
        <section className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            About
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Next.js 是什么
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 是一个基于 React 的全栈框架，由 Vercel 维护。React
            负责组件怎么写，Next.js 负责页面怎么送到浏览器：路由、服务端渲染、数据获取，以及图片、字体和 SEO
            这些上线时才会碰到的事情。
          </p>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            当前项目是 Next.js 16，使用 App Router。页面都放在{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              src/app
            </code>{" "}
            下面，这个介绍页本身就是一个例子。
          </p>
        </section>

        <section className="grid gap-4">
          {ideas.map((idea) => (
            <article
              key={idea.title}
              className="rounded-2xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-950"
            >
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                {idea.body}
              </p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-4 sm:flex-row">
          <a
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            阅读官方文档
          </a>
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-full border border-solid border-black/[.08] px-5 font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            回到首页
          </Link>
        </section>
      </main>
    </div>
  );
}
