import {
  currencyFormatter,
  currencyParser,
  percentFormatter,
  percentParser,
} from "./numberUtils";

describe("numberUtils", () => {
  describe("currencyParser", () => {
    it("works with USD", () => {
      expect(currencyParser()("$ 123.4")).toBe("123.4");
      expect(currencyParser()("$ 123")).toBe("123");
      expect(currencyParser()("$ ")).toBe("");
    });
    it("works with EUR", () => {
      expect(currencyParser("EUR")("€ 123,4")).toBe("123.4");
      expect(currencyParser("EUR")("€ 1.234,56")).toBe("1234.56");
      expect(currencyParser("EUR")("€ ")).toBe("");
    });
  });

  describe("currencyFormatter", () => {
    it("works with USD", () => {
      expect(currencyFormatter()("123.4")).toBe("$ 123.4");
      expect(currencyFormatter()("1234.56")).toBe("$ 1,234.56");
      expect(currencyFormatter()("")).toBe("$ ");
    });
    it("works with EUR", () => {
      expect(currencyFormatter("EUR")("123.4")).toBe("€ 123,4");
      expect(currencyFormatter("EUR")("1234.56")).toBe("€ 1.234,56");
      expect(currencyFormatter("EUR")("")).toBe("€ ");
    });
    it("works with NOK", () => {
      expect(currencyFormatter("NOK")("123.4")).toBe("kr 123.4");
      expect(currencyFormatter("NOK")("1234.56")).toBe("kr 1,234.56");
      expect(currencyFormatter("NOK")("")).toBe("kr ");
    });
  });

  it("percentParser works", () => {
    expect(percentParser("0.9%")).toBe(".009");
    expect(percentParser("9%")).toBe(".09");
    expect(percentParser("99%")).toBe(".99");
    expect(percentParser("900%")).toBe("9.00");
    expect(percentParser("999%")).toBe("9.99");
    expect(percentParser("%")).toBe(".00");
  });

  it("percentFormatter works", () => {
    expect(percentFormatter(".009")).toBe("0.9%");
    expect(percentFormatter("0.009")).toBe("0.9%");
    expect(percentFormatter(".09")).toBe("9%");
    expect(percentFormatter("0.09")).toBe("9%");
    expect(percentFormatter(".99")).toBe("99%");
    expect(percentFormatter("0.99")).toBe("99%");
    expect(percentFormatter("9")).toBe("900%");
    expect(percentFormatter("9.00")).toBe("900%");
    expect(percentFormatter(".00")).toBe("0%");
    expect(percentFormatter("")).toBe("0%");
  });
});
