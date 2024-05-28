import { delay, runsOnServerSide } from "../../src/utils/index";

describe("delay", () => {
  test("should resolve after the specified delay", async () => {
    const ms = 1000; // 1 second
    const start = Date.now();
    await delay(ms)();
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(ms);
  });

  test("should resolve immediately if no delay is specified", async () => {
    const start = Date.now();
    await delay()();
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeLessThan(10); // Assuming the delay is negligible
  });
});

describe("runsOnServerSide: Client", () => {
  test("should return false when running on the jsdom (client side)", () => {
    expect(runsOnServerSide).toBe(false);
  });
});
