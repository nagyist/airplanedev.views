import "@testing-library/jest-dom";
import { Request, Response } from "cross-fetch";

globalThis.process = {
  ...globalThis.process,
  env: { AIRPLANE_API_HOST: "http://api", AIRPLANE_TOKEN: "token" },
};
global.ResizeObserver = require("resize-observer-polyfill");
jest.setTimeout(15000);

// Needed so that tests using the jsdom environment can properly import openai
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;
global.Request = Request;
global.Response = Response;

// Needed for plotly.js testing
// https://github.com/plotly/react-plotly.js/issues/115#issuecomment-448688902
global.URL.createObjectURL = jest.fn();
