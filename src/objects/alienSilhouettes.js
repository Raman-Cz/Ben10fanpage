export function buildSilhouettes(root) {
  const names = ["Heatblast", "Four Arms", "XLR8", "Diamondhead", "Upgrade", "Wildmutt"];
  const nodes = names.map((name) => {
    const item = document.createElement("div");
    item.className = "silhouette";
    item.setAttribute("data-name", name);
    root.appendChild(item);
    return item;
  });

  return nodes;
}
