let randomUUID: () => string;

try {
  const crypto = require("crypto");
  randomUUID = crypto.randomUUID;
} catch (error) {
  randomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };
}

if (typeof globalThis.crypto === "undefined") {
  globalThis.crypto = {
    randomUUID: randomUUID,
  } as any;
}

if (typeof global !== "undefined" && typeof global.crypto === "undefined") {
  global.crypto = globalThis.crypto;
}
