import "@testing-library/jest-dom";

globalThis.process = {
  ...globalThis.process,
  env: { AIRPLANE_API_HOST: "http://api", AIRPLANE_TOKEN: "token" },
};
global.ResizeObserver = require("resize-observer-polyfill");
jest.setTimeout(15000);

// Needed for plotly.js testing
// https://github.com/plotly/react-plotly.js/issues/115#issuecomment-448688902
global.URL.createObjectURL = jest.fn();
