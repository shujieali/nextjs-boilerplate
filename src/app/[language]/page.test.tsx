import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((key) => key),
    i18n: {
      language: "en",
      resolvedLanguage: "en",
    },
  }),
  initReactI18next: {
    // add this line
    type: "3rdParty",
    init: jest.fn(),
  },
}));

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders the title from translation", () => {
    render(<Page />);

    const title = screen.getByText("title");

    expect(title).toBeInTheDocument();
  });
});
