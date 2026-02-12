import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export async function initHome() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const split = SplitText.create("p", { type: "lines" });

  const tl = gsap.timeline();

  tl.from(".container .top", { delay: 0.5, opacity: 0, y: -10, duration: 1 });
  tl.from("h1", { opacity: 0, y: 10, duration: 0.5 });
  tl.from(split.lines, { opacity: 0, y: 10, duration: 0.5, stagger: 0.5 });
  tl.from(".next-link", { opacity: 0, y: 10, duration: 0.5 });
}

export function destroyHome() {}
