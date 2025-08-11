import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchEmpty from "../SearchEmpty";
import * as recentSearches from "@/lib/recent-searches";

const mockRouter = {
  push: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("SearchEmpty", () => {
  it("renders the main heading and suggestion text", () => {
    render(<SearchEmpty />);

    const heading = screen.getByRole("heading", {
      name: /start typing to search/i,
    });
    expect(heading).toBeInTheDocument();

    const suggestion = screen.getByText(
      /try: “inception”, “harry potter”, “john wick”, “dune”…/i
    );
    expect(suggestion).toBeInTheDocument();
  });

  it("renders recent searches when available", () => {
    vi.spyOn(recentSearches, "getRecent").mockReturnValue([
      "Inception",
      "The Matrix",
    ]);

    render(<SearchEmpty />);

    const recentHeading = screen.getByRole("heading", { name: /recent/i });
    expect(recentHeading).toBeInTheDocument();

    const inceptionButton = screen.getByRole("button", { name: /inception/i });
    expect(inceptionButton).toBeInTheDocument();

    const matrixButton = screen.getByRole("button", { name: /the matrix/i });
    expect(matrixButton).toBeInTheDocument();
  });

  it("calls router.push with the correct query when a recent search is clicked", () => {
    vi.spyOn(recentSearches, "getRecent").mockReturnValue(["Inception"]);

    render(<SearchEmpty />);

    const inceptionButton = screen.getByRole("button", { name: /inception/i });
    fireEvent.click(inceptionButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/search?q=Inception&page=1");
  });
});
