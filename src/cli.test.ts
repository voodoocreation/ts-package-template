import { jest } from "@jest/globals";

import { greet } from "./helpers/index.js";

const rl = new Proxy<any>(
  {},
  {
    get: (obj, prop) => {
      obj[prop] = obj[prop] || jest.fn();
      return obj[prop];
    },
  },
);

jest.unstable_mockModule("readline", () => ({
  createInterface: () => rl,
}));

jest.spyOn(console, "log").mockImplementationOnce(() => {});

describe("CLI", () => {
  beforeAll(async () => {
    await import("./cli.js");
  });

  it("prompts the user for their name", () => {
    expect(rl.question).toHaveBeenCalledTimes(1);
    expect(rl.question).toHaveBeenCalledWith(
      "What is your name?\n",
      expect.anything(),
    );
  });

  it("gives an answer", () => {
    const [, answer] = rl.question.mock.calls[0];
    answer("Test");
  });

  it("outputs the greeting", () => {
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(greet("Test"));
  });

  it("closes the dialog", () => {
    expect(rl.close).toHaveBeenCalledTimes(1);
  });
});
