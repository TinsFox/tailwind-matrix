import { IndexHeader } from "components/IndexHeader";

export default function Home() {
  return (
    <>
      <IndexHeader></IndexHeader>
      <section className="text-center px-8 mt-20 sm:mt-32 md:mt-40">
        <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">
          “Best practices” don’t actually work.
        </h2>
        <figure>
          <blockquote>
            <p className="mt-6 max-w-3xl mx-auto text-lg">
              I’ve written{" "}
              <a
                href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/"
                className="text-sky-500 font-semibold dark:text-sky-400"
              >
                a few thousand words
              </a>{" "}
              on why traditional “semantic class names” are the reason CSS is
              hard to maintain, but the truth is you’re never going to believe
              me until you actually try it. If you can suppress the urge to
              retch long enough to give it a chance, I really think you’ll
              wonder how you ever worked with CSS any other way.
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-4 text-left">
            <img
              src={"/img/adam.jpg"}
              alt=""
              className="w-14 h-14 rounded-full"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="text-slate-900 font-semibold dark:text-white">
                Adam Wathan
              </div>
              <div className="mt-0.5 text-sm leading-6">
                Creator of Tailwind CSS
              </div>
            </div>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
