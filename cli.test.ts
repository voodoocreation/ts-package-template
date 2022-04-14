/* eslint-disable no-console */
import readline from "readline";

import { greet } from "./helpers";

const rl: readline.ReadLine = new Proxy<any>(
  {},
  {
    get: (obj, prop) => {
      obj[prop] = obj[prop] || jest.fn();
      return obj[prop];
    },
  }
);

jest.spyOn(readline, "createInterface").mockImplementation(() => rl);
jest.spyOn(console, "log").mockImplementationOnce(() => {});

import("./cli");

describe("CLI", () => {
  it("prompts the user for their name", () => {
    expect(rl.question).toHaveBeenCalledTimes(1);
    expect(rl.question).toHaveBeenCalledWith(
      "What is your name?\n",
      expect.anything()
    );
  });

  it("gives an answer", () => {
    const [, answer] = (rl.question as jest.Mock).mock.calls[0];
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
