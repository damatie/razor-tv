import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchResults from "../SearchResults";
import * as useMovies from "@/hooks/useMovies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockRouter = {
  push: vi.fn(),
};

const searchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams,
  useRouter: () => mockRouter,
}));

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("SearchResults", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    searchParams.delete("q");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders SearchEmpty when there is no query", () => {
    vi.spyOn(useMovies, "useSearchMovies").mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as any);

    renderWithClient(<SearchResults />);
    const heading = screen.getByRole("heading", {
      name: /start typing to search/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders GridSkeleton when loading", () => {
    searchParams.set("q", "Inception");
    vi.spyOn(useMovies, "useSearchMovies").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);

    renderWithClient(<SearchResults />);
    const skeleton = screen.getByRole("status", { name: /loading/i });
    expect(skeleton).toBeInTheDocument();
  });

  it("renders no results message on error", () => {
    searchParams.set("q", "Inception");
    vi.spyOn(useMovies, "useSearchMovies").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);

    renderWithClient(<SearchResults />);
    const noResults = screen.getByText(/no results found/i);
    expect(noResults).toBeInTheDocument();
  });

  it("renders search results and pagination on success", () => {
    searchParams.set("q", "Inception");
    vi.spyOn(useMovies, "useSearchMovies").mockReturnValue({
      data: {
        Search: [
          {
            imdbID: "1",
            Title: "Inception",
            Year: "2010",
            Poster: "https://example.com/poster.jpg",
          },
        ],
        totalResults: "20", // More than 1 page of results
      },
      isLoading: false,
      isError: false,
    } as any);

    renderWithClient(<SearchResults />);
    const inception = screen.getByText(/inception/i);
    expect(inception).toBeInTheDocument();

    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
  });
});
