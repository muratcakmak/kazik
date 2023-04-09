var REPLACEMENT_IMAGES = [
  "https://i.ibb.co/X4CDKkZ/Screenshot-2023-04-07-at-12-15-48.png",
  "https://i.ibb.co/JmFx2gy/Screenshot-2023-04-07-at-12-15-31.png"
];

const flashReplacements = (img) => {
  const originalImage = img.src;
  img.src = REPLACEMENT_IMAGES[Math.floor(Math.random() * 2)];
  const timer = setTimeout(() => {
    img.src = originalImage;
    clearTimeout(timer);
  }, 3000);
};

(async () => {
  const images = document.getElementsByTagName("img");
  for (const img of images) {
    chrome.runtime.sendMessage(
      { type: "fetchImage", url: img.src },
      async (response) => {
        const dataUrl = response.dataUrl;
        if (!dataUrl) return;
        flashReplacements(img);
      }
    );
  }
})();
