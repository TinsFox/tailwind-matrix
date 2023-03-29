import { Header } from "components/header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <section className="mt-20 px-8 text-center sm:mt-32 md:mt-40">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          A React Component UI Library build with Tailwind CSS and radix-ui
        </h2>
        <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
          <Link
            href={"/docs/installation"}
            className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
          >
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
