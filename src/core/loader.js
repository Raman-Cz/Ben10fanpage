export async function initLoader() {
  const loader = document.querySelector("#loader");
  const loaderBar = document.querySelector("#loader-bar");
  const loaderPercent = document.querySelector(".loader-percent");
  if (!loader || !loaderBar) return;

  let value = 0;
  await new Promise((resolve) => {
    const timer = setInterval(() => {
      value = Math.min(value + Math.random() * 15 + 5, 98);
      loaderBar.style.width = `${value}%`;
      if (loaderPercent) loaderPercent.textContent = `${Math.round(value)}%`;
      if (value >= 98) {
        clearInterval(timer);
        resolve();
      }
    }, 50);
  });

  if (loaderPercent) loaderPercent.textContent = "100%";
  loaderBar.style.width = "100%";
  await new Promise((resolve) => setTimeout(resolve, 400));
  loader.classList.add("is-hidden");
  await new Promise((resolve) => setTimeout(resolve, 800));
  loader.remove();
}
