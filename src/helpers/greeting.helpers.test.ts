import { greet } from "./greeting.helpers";

describe("[helpers] Greeting", () => {
  describe("greet", () => {
    it("returns the correctly-formatted greeting", () => {
      expect(greet("Test")).toBe(`Hello, Test!`);
    });
  });
});
