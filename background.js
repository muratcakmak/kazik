// background.js
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "fetchImage") {
      fetch(request.url, { mode: "cors" })
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            sendResponse({ dataUrl: reader.result });
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          console.error("Background.jsFetch error:", error);
        });
      return true;
    }
  }
);
