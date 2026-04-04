const VILLAINS = [
  { 
    name: "Vilgax", 
    summary: "Intergalactic warlord driven by Omnitrix conquest. The most dangerous alien in the galaxy.",
    icon: "👹",
    image: "/assets/images/vilgax.png"
  }
];

export function renderVillains(root) {
  root.innerHTML = "";
  for (const villain of VILLAINS) {
    const card = document.createElement("article");
    card.className = "villain-card";
    card.innerHTML = `
      <img src="${villain.image}" alt="${villain.name}" class="villain-image" onerror="this.style.display='none'" />
      <span class="villain-icon">${villain.icon}</span>
      <h3>${villain.name}</h3>
      <p>${villain.summary}</p>
    `;
    root.appendChild(card);
  }
}
