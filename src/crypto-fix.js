// Direct crypto fix for Node.js
if (typeof global.crypto === "undefined") {
  global.crypto = {
    randomUUID: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    },
  };
}

// Also ensure it's available on globalThis
if (
  typeof globalThis !== "undefined" &&
  typeof globalThis.crypto === "undefined"
) {
  globalThis.crypto = global.crypto;
}

console.log("Crypto polyfill loaded successfully");
