import gsap from "gsap";

export function initContact() {
  const tl = gsap.timeline();
  tl.set("body", { backgroundColor: "#DAD1CA" });
  tl.from(".container .bottom", { opacity: 0, y: "100%", duration: 1.2 });
  tl.from(".container .top", { opacity: 0, y: 10 });
  tl.from(".container .bottom h1", { opacity: 0, y: 5 });
  tl.from(".container .bottom form > *", { opacity: 0, y: 5, stagger: 0.2 });
  tl.set("body", { backgroundColor: "#202120" });
}

export function destroyContact() {}
