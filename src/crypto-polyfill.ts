// Aggressive crypto polyfill for Node.js environments
let randomUUID: () => string;

try {
  // Try to import from Node.js crypto module
  const crypto = require("crypto");
  randomUUID = crypto.randomUUID;
} catch (error) {
  // Fallback implementation if crypto module is not available
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

// Ensure crypto is available on all possible global objects
const cryptoObject = {
  randomUUID: randomUUID,
  getRandomValues: (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  },
  subtle: {} as any,
};

// Set on globalThis
if (typeof globalThis !== "undefined") {
  (globalThis as any).crypto = cryptoObject;
}

// Set on global (Node.js)
if (typeof global !== "undefined") {
  (global as any).crypto = cryptoObject;
}

// Set on window (browser)
if (typeof window !== "undefined") {
  (window as any).crypto = cryptoObject;
}

// Set on self (Web Worker)
if (typeof self !== "undefined") {
  (self as any).crypto = cryptoObject;
}

// Also try to monkey patch the crypto module if it exists
try {
  const cryptoModule = require("crypto");
  if (cryptoModule && !cryptoModule.randomUUID) {
    cryptoModule.randomUUID = randomUUID;
  }
} catch (error) {
  // Ignore errors
}

// Export for manual import if needed
export { randomUUID };
