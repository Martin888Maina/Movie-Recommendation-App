// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    // allows importing CSS
    "\\.(css|scss)$": "identity-obj-proxy", 
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
