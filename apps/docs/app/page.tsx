export default function Home() {
  return (
    <>
      <section className="mt-20 px-8 text-center sm:mt-32 md:mt-40">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          “Best practices” don’t actually work.
        </h2>
        <figure>
          <blockquote>
            <p className="mx-auto mt-6 max-w-3xl text-lg">
              I’ve written{" "}
              <a
                href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/"
                className="font-semibold text-sky-500 dark:text-sky-400"
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
              className="h-14 w-14 rounded-full"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
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
