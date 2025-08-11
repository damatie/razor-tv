import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { Route } from "next";
import BackBar from "../BackBar";

const mockRouter = {
  back: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("BackBar", () => {
  it("renders a button and calls router.back when history is available", () => {
    Object.defineProperty(window, "history", {
      value: {
        length: 2,
      },
      writable: true,
    });

    render(<BackBar />);

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("renders a link to the fallback URL when history is not available", () => {
    Object.defineProperty(window, "history", {
      value: {
        length: 1,
      },
      writable: true,
    });

    render(<BackBar fallback={"/home" as Route} />);

    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/home");
  });
});
