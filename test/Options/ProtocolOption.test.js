import ProtocolOption from "../../src/Options/ProtocolOption";

describe("ProtocolOption", () => {
  let protocolOption;

  beforeEach(() => {
    protocolOption = new ProtocolOption();
  });

  test("validates allowed protocols correctly", () => {
    protocolOption.onlyProtocol(["http", "https"]);
    expect(protocolOption.validate("http://example.com")).toBeTruthy();
    expect(protocolOption.validate("https://example.com")).toBeTruthy();
    expect(protocolOption.validate("ftp://example.com")).toBeFalsy();
  });

  test("adds http protocol correctly", () => {
    protocolOption.onlyHttp();
    expect(protocolOption.validate("http://example.com")).toBeTruthy();
    expect(protocolOption.validate("https://example.com")).toBeFalsy();
  });

  test("adds https protocol correctly", () => {
    protocolOption.onlyHttps();
    expect(protocolOption.validate("https://example.com")).toBeTruthy();
    expect(protocolOption.validate("http://example.com")).toBeFalsy();
  });

  test("supports multiple protocols being added", () => {
    protocolOption.onlyHttp().onlyHttps();
    expect(protocolOption.validate("http://example.com")).toBeTruthy();
    expect(protocolOption.validate("https://example.com")).toBeTruthy();
    expect(protocolOption.validate("ftp://example.com")).toBeFalsy();
  });
});
