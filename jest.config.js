export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "js"],

  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|scss|pcss)$": "identity-obj-proxy",
  },
};
