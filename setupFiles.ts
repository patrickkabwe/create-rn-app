import { afterEach, vi } from "vitest";

vi.mock("execa");

afterEach(() => {
  vi.resetAllMocks();
});
