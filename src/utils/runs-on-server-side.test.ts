/**
 * @jest-environment node
 */

import { runsOnServerSide } from "./index";

describe("runsOnServerSide: Node", () => {
  test("should return true when running on the server side", () => {
    expect(runsOnServerSide).toBe(true);
  });
});
