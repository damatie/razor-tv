import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NavBar from "../NavBar";

const mockRouter = {
  push: vi.fn(),
};

const searchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => searchParams,
  usePathname: () => "/",
}));

describe("NavBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchParams.delete("q");
  });

  it("renders the Brand component and search input", () => {
    render(<NavBar />);

    const brand = screen.getByRole("link", { name: /razortv/i });
    expect(brand).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search movies...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
  });

  it("updates the search input value when the user types", () => {
    render(<NavBar />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "Inception" } });
    expect(searchInput).toHaveValue("Inception");
  });

  it("calls the debounced push function with the correct query", async () => {
    render(<NavBar />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "Inception" } });

    // Wait for the debounce timeout
    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(mockRouter.push).toHaveBeenCalledWith("/search?q=Inception&page=1");
  });

  it("initializes with the query from search params", () => {
    searchParams.set("q", "The Matrix");
    render(<NavBar />);
    const searchInput = screen.getByPlaceholderText("Search movies...");
    expect(searchInput).toHaveValue("The Matrix");
  });
});
