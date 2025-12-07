const MENU = [
  {
    id: 1,
    category: "Predjedlá",
    name: "Bruschetta s paradajkami",
    desc: "Chrumkavý chlieb, paradajky, bazalka, balzamiková redukcia",
    price: 5,
    weight: "120 g",
    tags: ["Vegetariánske"],
    popular: true,
  },
  {
    id: 2,
    category: "Šaláty",
    name: "Šalát Caesar",
    desc: "Rímsky šalát, kuracie mäso, parmezán, dressing Caesar",
    price: 7,
    weight: "220 g",
    tags: ["Vegetar"],
    popular: false,
  },
  {
    id: 3,
    category: "Hlavné jedlá",
    name: "Ribeye steak",
    desc: "200 g grilovaného steaku, BBQ omáčka, mix zeleniny",
    price: 12,
    weight: "300 g",
    tags: ["Bez lepku"],
    popular: true,
  },
  {
    id: 4,
    category: "Pasta / Pizza",
    name: "Pasta Carbonara",
    desc: "Slanina, smotanová omáčka, parmezán",
    price: 8,
    weight: "320 g",
    tags: ["Hit"],
    popular: true,
  },
  {
    id: 5,
    category: "Dezerty",
    name: "Tiramisu",
    desc: "Klasický taliansky dezert s mascarpone",
    price: 5,
    weight: "150 g",
    tags: ["Vegetariánske"],
    popular: false,
  },
  {
    id: 6,
    category: "Nápoje",
    name: "Domáca limonáda",
    desc: "Citrón, mäta, trochu medu",
    price: 3,
    weight: "350 ml",
    tags: ["Vegánske"],
    popular: false,
  },
  {
    id: 7,
    category: "Nápoje",
    name: "Vino",
    desc: "Červená, biela, ružová",
    price: 3,
    weight: "350 ml",
    tags: ["Vegánske"],
    popular: false,
  },
  {
    id: 8,
    category: "Šaláty",
    name: "Šalát Caesar",
    desc: "Rímsky šalát, kuracie mäso, parmezán, dressing Caesar",
    price: 7,
    weight: "220 g",
    tags: [],
    popular: false,
  },
  {
    id: 9,
    category: "Nápoje",
    name: "Čaj",
    desc: "Citrón, mäta, trochu medu",
    price: 3,
    weight: "350 ml",
    tags: ["Vegánske"],
    popular: false,
  },
  {
    id: 10,
    category: "Dezerty",
    name: "Čaj",
    desc: "Citrón, mäta, trochu medu",
    price: 3,
    weight: "350 ml",
    tags: ["Vegánske"],
    popular: false,
  },
];

const categoriesEl = document.getElementById("categories");
const gridEl = document.getElementById("menuGrid");
const searchEl = document.getElementById("search");

const categories = [
  "Všetko",
  ...Array.from(new Set(MENU.map((i) => i.category))),
];

categories.forEach((c, i) => {
  const btn = document.createElement("button");
  btn.className = "cat-btn";
  btn.textContent = c;
  btn.dataset.cat = c;
  btn.setAttribute("aria-pressed", i === 0 ? "true" : "false");
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".cat-btn")
      .forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    currentPage = 1;
    renderGrid();
  });
  categoriesEl.appendChild(btn);
});

function dishCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.innerHTML = `<img src="images/menu/dish-${item.id}.jpg" alt="${item.name}" class="w-full h-full object-cover rounded-xl">`;
  const info = document.createElement("div");
  info.className = "info";
  const top = document.createElement("div");
  top.className = "dish-title";
  const name = document.createElement("h3");
  name.textContent = item.name;
  const right = document.createElement("div");
  right.innerHTML = `<div class='price'>${item.price} €</div>`;
  top.appendChild(name);
  top.appendChild(right);
  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = item.desc;
  const meta = document.createElement("div");
  meta.className = "meta";
  const metaLeft = document.createElement("div");
  metaLeft.className = "icons";
  if (item.popular) metaLeft.innerHTML += `<span class='popular'>Hit</span>`;
  (item.tags || []).forEach(
    (t) => (metaLeft.innerHTML += `<span class='pill'>${t}</span>`)
  );
  const metaRight = document.createElement("div");
  metaRight.className = "muted";
  metaRight.textContent = item.weight || "";
  meta.appendChild(metaLeft);
  meta.appendChild(metaRight);
  info.appendChild(top);
  info.appendChild(desc);
  card.appendChild(thumb);
  card.appendChild(info);
  card.appendChild(meta);
  card.addEventListener("click", () => openModal(item));
  return card;
}

let currentPage = 1;
const itemsPerPage = 9;

// renderGrid function
function renderGrid() {
  const active = document.querySelector('.cat-btn[aria-pressed="true"]').dataset
    .cat;
  const q = (searchEl.value || "").trim().toLowerCase();
  gridEl.innerHTML = "";

  const filtered = MENU.filter((m) => {
    if (active !== "Všetko" && m.category !== active) return false;
    if (q)
      return (
        m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q)
      );
    return true;
  });

  const start = 0;
  const end = currentPage * itemsPerPage;
  const toShow = filtered.slice(start, end);

  // Add cards or notifications about an empty grid
  if (toShow.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML =
      '<div style="flex:1;color:var(--muted)">Nenašli sa žiadne jedlá</div>';
    gridEl.appendChild(empty);
  } else {
    toShow.forEach((item) => gridEl.appendChild(dishCard(item)));
  }

  const oldContainer = document.querySelector(".load-more-container");
  if (oldContainer) oldContainer.remove();

  // Add a button under the grid
  if (end < filtered.length) {
    const btn = document.createElement("button");
    btn.id = "loadMoreBtn";
    btn.textContent = "Zobraziť viac";
    btn.onclick = () => {
      currentPage++;
      renderGrid();
    };

    // Button styles
    btn.style.padding = "10px 16px";
    btn.style.borderRadius = "8px";
    btn.style.border = "none";
    btn.style.background = "#b08e4f";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1rem";
    btn.style.minWidth = "160px";

    // Button centering container
    const container = document.createElement("div");
    container.className = "load-more-container";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.margin = "20px 0";

    container.appendChild(btn);

    gridEl.after(container);
  }
}

searchEl.addEventListener("input", () => {
  currentPage = 1;
  renderGrid();
});

const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const modalExtra = document.getElementById("modalExtra");
const modalClose = document.getElementById("modalClose");

function openModal(item) {
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc;
  modalImg.src = "images/dish-" + item.id + ".jpg";
  modalExtra.textContent = `${item.weight || ""} • ${item.price} €`;
  modalBackdrop.style.display = "flex";
}

modalClose.addEventListener(
  "click",
  () => (modalBackdrop.style.display = "none")
);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) modalBackdrop.style.display = "none";
});

renderGrid();
