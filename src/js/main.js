import { applyI18n, detectLang } from "@/i18n/i18n";
import barba from "@barba/core";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { initHome, destroyHome } from "@js/home";
import { initPortfolio, destroyPortfolio } from "@js/portfolio";
import { initAbout, destroyAbout } from "@js/about";
import { initContact, destroyContact } from "@js/contact";
import {} from "@js/menu";
import { closeMenu, updateActiveNav } from "./menu";

// const hamburger = document.querySelector(".ham");
// const menu = document.querySelector("#global-navigation");
const lang = detectLang();
applyI18n(lang);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ignoreMobileResize: true,
  });
}

createSmoother();

// (선택) 링크 클릭 전에 페이지 전환을 확실히 적용하려면 프리패치보단 이 기본부터
function initI18n(container) {
  const lang = detectLang();
  applyI18n(lang, container);
}

function initPage(container) {
  // 페이지별로 필요한 초기화가 있으면 여기서
  initI18n(container);
}

barba.init({
  views: [
    {
      namespace: "home",
      afterEnter({ next }) {
        initHome(next.container);
      },
      beforeLeave({ current }) {
        destroyHome?.(current.container);
      },
    },
    {
      namespace: "portfolio",
      afterEnter({ next }) {
        initPortfolio(next.container);
      },
      beforeLeave({ current }) {
        destroyPortfolio?.(current.container);
      },
    },
    {
      namespace: "about",
      afterEnter({ next }) {
        initAbout(next.container);
      },
      beforeLeave({ current }) {
        destroyAbout?.(current.container);
      },
    },
    {
      namespace: "contact",
      afterEnter({ next }) {
        initContact(next.container);
      },
      beforeLeave({ current }) {
        destroyContact?.(current.container);
      },
    },
  ],
  transitions: [
    {
      name: "fade",

      // 첫 로드
      once({ next }) {
        initPage(next.container);
        updateActiveNav();
      },

      // 이동 전 (현재 페이지)
      async leave({ current }) {
        return gsap.to(current.container, { opacity: 0 });
      },

      // 이동 후 (다음 페이지)
      enter({ next }) {
        closeMenu();
        initPage(next.container);
        updateActiveNav();

        return gsap.from(next.container, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      },
      afterEnter() {},
    },
  ],
});

barba.hooks.leave(() => smoother?.kill());
barba.hooks.enter(() => {
  createSmoother();
  window.scrollTo(0, 0);
  smoother?.scrollTo(0, false);
  ScrollTrigger.refresh();
});
barba.hooks.after(() => ScrollTrigger.refresh());
