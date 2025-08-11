import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Brand from "../Brand";

describe("Brand", () => {
  it("renders the brand logo and text", () => {
    render(<Brand />);

    const logo = screen.getByRole("img", { name: /razortv logo/i });
    expect(logo).toBeInTheDocument();

    const brandName = screen.getByText("RazorTV");
    expect(brandName).toBeInTheDocument();
  });
});
