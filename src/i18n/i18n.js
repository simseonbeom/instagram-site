import ko from "./ko.json";
import en from "./en.json";

const dict = { ko, en };

function get(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function detectLang() {
  // 1) URL 우선
  const seg = location.pathname.split("/")[1];
  if (seg === "ko" || seg === "en") return seg;

  // 2) 저장된 값
  const saved = localStorage.getItem("lang");
  if (saved === "ko" || saved === "en") return saved;

  // 3) 브라우저 언어
  return navigator.language?.startsWith("ko") ? "ko" : "en";
}

function calcYears(startYear) {
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - Number(startYear));
}

function applyHighlights(text, el) {
  return text.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const value =
      el.dataset[`highlight${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (!value) return _;
    return `<span class="highlight">${value}</span>`;
  });
}

function applyTokens(text, el) {
  return text.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    // 줄바꿈 처리
    if (key === "br") {
      return "<br />";
    }

    // 연차 처리
    if (key === "years") {
      const start = el.dataset.careerStart;
      if (!start) return _;
      return calcYears(start);
    }

    // 하이라이트 처리
    const dataKey = "highlight" + key.charAt(0).toUpperCase() + key.slice(1);
    const value = el.dataset[dataKey];

    if (!value) return _;
    return `<span class="highlight">${value}</span>`;
  });
}

function applyI18nAttrs(data, root = document) {
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    // 예: "alt:portfolio.section1.lecture1Alt, title:common.someTitle"
    const pairs = el.dataset.i18nAttr.split(",").map((s) => s.trim());

    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (!attr || !key) return;

      const value = get(data, key);
      if (value == null) return; // 없으면 유지
      el.setAttribute(attr, value);
    });
  });
}

export function applyI18n(lang, root = document) {
  const data = dict[lang] || dict.en;
  document.documentElement.lang = lang;

  // 일반 텍스트
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = get(data, key) ?? key;
  });

  // HTML(하이라이트 포함)
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    const raw = get(data, key);
    if (!raw) return;
    el.innerHTML = applyHighlights(raw, el);
    el.innerHTML = applyTokens(raw, el);
  });

  applyI18nAttrs(data, root);
}
