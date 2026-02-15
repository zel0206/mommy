const fallbackContent = {
  page1: {
    title: "Hi mhe malayo ka so muni lg gift ko simo hehe",
    subtitle: "I made this little Valentine page just for you.",
    button: "click me mommy",
    photo: "images/me.jpg",
    alt: "My photo"
  },
  page2: {
    title: "My Mom",
    subtitle: "happy valentines day mommy, I love you so much -Arcel",
    photo: "images/mom.jpg",
    alt: "Mommy photo"
  }
};

async function loadContent() {
  try {
    const response = await fetch("content.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load content.json");
    }
    return await response.json();
  } catch {
    return fallbackContent;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && typeof value === "string") {
    el.textContent = value;
  }
}

function setImage(id, src, alt) {
  const el = document.getElementById(id);
  if (!el) return;
  if (typeof src === "string" && src.trim()) {
    el.src = src;
  }
  if (typeof alt === "string" && alt.trim()) {
    el.alt = alt;
  }
}

function applyContent(content) {
  const page1 = content.page1 || {};
  const page2 = content.page2 || {};

  setText("title1", page1.title);
  setText("subtitle1", page1.subtitle);
  setText("nextBtn", page1.button);
  setImage("photo1", page1.photo, page1.alt);

  setText("title2", page2.title);
  setText("subtitle2", page2.subtitle);
  setImage("photo2", page2.photo, page2.alt);
}

function createFloatingHearts() {
  const bg = document.getElementById("bgHearts");
  if (!bg) return;
  const symbols = ["❤", "♡", "❤", "❤", "♡"];

  for (let i = 0; i < 22; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = `${-5 - Math.random() * 25}vh`;
    heart.style.fontSize = `${12 + Math.random() * 26}px`;
    heart.style.animationDuration = `${8 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 7}s`;
    bg.appendChild(heart);
  }
}

function enablePageTransition() {
  const nextBtn = document.getElementById("nextBtn");
  const first = document.getElementById("page1");
  const second = document.getElementById("page2");
  const card = document.getElementById("card");

  if (!nextBtn || !first || !second || !card) return;

  nextBtn.addEventListener("click", () => {
    first.classList.remove("active");
    second.classList.add("active");
    card.classList.add("celebrate");
    setTimeout(() => card.classList.remove("celebrate"), 480);
  });
}

async function init() {
  createFloatingHearts();
  const content = await loadContent();
  applyContent(content);
  enablePageTransition();
}

init();
