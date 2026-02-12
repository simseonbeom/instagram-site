import gsap from "gsap";

export function initPortfolio() {
  const tl = gsap.timeline();
  tl.to(".container h1", { delay: 0.3, x: 0, opacity: 1, duration: 1 });
  tl.from(
    ".container > *:not(h1)",
    {
      opacity: 0,
      x: -10,
      stagger: 0.5,
      duration: 1,
    },
    "-=0.6",
  );
}

export function destroyPortfolio() {}
