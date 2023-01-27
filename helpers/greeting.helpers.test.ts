import { greet } from "./greeting.helpers.js";

describe("[helpers] Greeting", () => {
  describe("greet", () => {
    it("returns the correctly-formatted greeting", () => {
      expect(greet("Test")).toBe(`Hello, Test!`);
    });
  });
});
