import { SupaMenu } from "../index";
import { ERRORS } from "../lib/constants";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Supamenu", () => {
  it("should throw an error if no HTML element is given at init", () => {
    // @ts-expect-error calling without arguments to test error throwing
    const supamenuWithoutElement = () => new SupaMenu();
    expect(supamenuWithoutElement).toThrow(ERRORS.MISSING_ELEMENT_PARAM);
  });

  it("should throw an error when no id is set on the givent HTMLElement", () => {
    const element = document.createElement("nav");

    const supamenuWithoutId = () => new SupaMenu(element);
    expect(supamenuWithoutId).toThrow(ERRORS.MISSING_ID_ATTRIBUTE_ON_ELEMENT);
  });

  it("should init if HTML Element is given as fisrt parameter", () => {
    const element = document.createElement("nav");
    element.id = "test_ID";
    const supamenu = new SupaMenu(element);

    expect(supamenu).not.toBeNull();
    expect(supamenu.getElement()).toBe(element);
  });
});
