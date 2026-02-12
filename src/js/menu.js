import gsap from "gsap";

const toggleBtn = document.querySelector(".ham");
const nav = document.querySelector("#global-navigation");
const closeBtn = nav.querySelector(".menu-close");
export let clicked = false;

const menuTimeline = gsap.timeline({ paused: true });
menuTimeline.from(nav, { opacity: 0 });
menuTimeline.from(".nav-list > li > a", {
  y: "100%",
  duration: 0.7,
  stagger: 0.1,
  ease: "power2.inOut",
});
menuTimeline.from(
  ".nav-tagline,.nav-footer",
  { opacity: 0, ease: "power2.inOut" },
  "-=0.3",
);

export function updateActiveNav() {
  const currentPath = location.pathname.replace(/\/$/, "");
  const links = document.querySelectorAll("#global-navigation a[href]");

  links.forEach(async (a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    const targetPath = new URL(href, location.origin).pathname.replace(
      /\/$/,
      "",
    );

    const li = a.closest("li");
    if (!li) return;

    const isActive = targetPath === currentPath;
    if (isActive) {
      a.setAttribute("aria-current", "page");
      a.setAttribute("aria-disabled", "true");
      a.style.pointerEvents = "none";
    } else {
      a.removeAttribute("aria-disabled");
      a.style.pointerEvents = "";
    }

    // 🔹 기존 active 제거
    await gsap.to(a, {
      color: "#202120",
      ease: "power2.out",
      onComplete: () => {
        li.classList.remove("active");
        a.removeAttribute("aria-current");
      },
    });

    if (isActive) {
      // 🔥 애니메이션 먼저 실행
      gsap.to(a, {
        color: "#8e8883",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          li.classList.add("active");
          a.setAttribute("aria-current", "page");
        },
      });
    }
  });
}

function isOpen() {
  return toggleBtn.classList.contains("active");
  // 또는 toggleBtn.getAttribute("aria-expanded") === "true"
}

export function openMenu() {
  nav.setAttribute("aria-hidden", "false");
  toggleBtn.setAttribute("aria-expanded", "true");
  toggleBtn.classList.add("active");
  toggleBtn.setAttribute("aria-label", "close menu");
  toggleBtn.focus();
  menuTimeline.restart();
  // clicked = true;
}

export async function closeMenu() {
  toggleBtn.classList.remove("active");
  await menuTimeline.reverse();
  nav.setAttribute("aria-hidden", "true");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.focus();
  toggleBtn.setAttribute("aria-label", "open menu");
  // clicked = false;
}

export function menu() {
  if (!isOpen()) openMenu();
  else closeMenu();
}

toggleBtn.addEventListener("click", menu);

// ESC 키 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.getAttribute("aria-hidden") === "false") {
    closeMenu();
  }
});
