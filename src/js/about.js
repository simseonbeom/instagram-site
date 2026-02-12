import gsap from "gsap";

export function initAbout() {
  gsap.from(".container > *", { delay: 1, opacity: 0, y: 10, stagger: 0.2 });
}

export function destroyAbout() {}
