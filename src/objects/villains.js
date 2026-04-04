const VILLAINS = [
  { 
    name: "Vilgax", 
    summary: "Intergalactic warlord driven by Omnitrix conquest. The most dangerous alien in the galaxy.",
    icon: "👹"
  },
  { 
    name: "Kevin 11", 
    summary: "Mutating rival with unstable powers and tactical aggression. Can absorb any material.",
    icon: "💀"
  },
  { 
    name: "Ghostfreak", 
    summary: "Ectonurite terror with stealth dominance and psychic pressure. Once part of the Omnitrix.",
    icon: "👻"
  },
  { 
    name: "Hex", 
    summary: "Dark mage using rune casting and corrupted relics. Master of black magic and sorcery.",
    icon: "🔮"
  }
];

export function renderVillains(root) {
  root.innerHTML = "";
  for (const villain of VILLAINS) {
    const card = document.createElement("article");
    card.className = "villain-card";
    card.innerHTML = `
      <span class="villain-icon">${villain.icon}</span>
      <h3>${villain.name}</h3>
      <p>${villain.summary}</p>
    `;
    root.appendChild(card);
  }
}
