const SILHOUETTE_IMAGES = {
  "Heatblast": "/assets/images/heatblast.png",
  "Four Arms": "/assets/images/fourarms.png",
  "XLR8": "/assets/images/xlr8.png",
  "Diamondhead": "/assets/images/diamondhead.png",
  "Upgrade": "/assets/images/upgrade.png",
  "Ghostfreak": "/assets/images/ghostfreak.png"
};

export function buildSilhouettes(root) {
  const names = ["Heatblast", "Four Arms", "XLR8", "Diamondhead", "Upgrade", "Ghostfreak"];
  const nodes = names.map((name) => {
    const item = document.createElement("div");
    item.className = "silhouette";
    item.setAttribute("data-name", name);
    if (name === "Heatblast") item.classList.add("active");
    
    const img = document.createElement("img");
    img.src = SILHOUETTE_IMAGES[name];
    img.alt = name;
    img.style.cssText = "width: 80%; height: 80%; object-fit: contain; filter: brightness(0.4) contrast(1.2);";
    item.appendChild(img);
    
    root.appendChild(item);
    return item;
  });

  return nodes;
}
