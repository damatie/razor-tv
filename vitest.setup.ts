import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

vi.mock("next/link", () => {
  // require React only when the mock is evaluated to avoid ESM/CJS quirks
  const React = require("react") as typeof import("react");
  return {
    __esModule: true,
    default: ({
      href,
      children,
      ...rest
    }: React.PropsWithChildren<{ href: string }>) =>
      React.createElement("a", { href, ...rest }, children),
  };
});
