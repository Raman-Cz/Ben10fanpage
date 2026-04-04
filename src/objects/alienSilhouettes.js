const SILHOUETTE_IMAGES = {
  "Heatblast": "/assets/images/heatblast.svg",
  "Four Arms": "/assets/images/fourarms.svg",
  "XLR8": "/assets/images/xlr8.svg",
  "Diamondhead": "/assets/images/diamondhead.svg",
  "Upgrade": "/assets/images/upgrade.svg",
  "Ghostfreak": "/assets/images/ghostfreak.svg"
};

export function buildSilhouettes(root) {
  const names = ["Heatblast", "Four Arms", "XLR8", "Diamondhead", "Upgrade", "Ghostfreak"];
  const nodes = names.map((name) => {
    const item = document.createElement("div");
    item.className = "silhouette";
    item.setAttribute("data-name", name);
    
    const img = document.createElement("img");
    img.src = SILHOUETTE_IMAGES[name];
    img.alt = name;
    img.style.cssText = "width: 80%; height: 80%; object-fit: contain; filter: brightness(0.3) contrast(1.2);";
    item.appendChild(img);
    
    root.appendChild(item);
    return item;
  });

  return nodes;
}
