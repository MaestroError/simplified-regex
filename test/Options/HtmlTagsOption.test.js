import HtmlTagsOption from "../../src/Options/HtmlTagsOption";

describe("HtmlTagsOption", () => {
  let htmlTagsOption;

  beforeEach(() => {
    htmlTagsOption = new HtmlTagsOption();
  });

  test("allows specified tags only", () => {
    htmlTagsOption.allowTags("p,div");
    expect(
      htmlTagsOption.validate("<p>Paragraph</p><div>Division</div>")
    ).toBeTruthy();
    expect(htmlTagsOption.validate("<span>Span</span>")).toBeFalsy();
  });

  test("restricts specified tags", () => {
    htmlTagsOption.restrictTags("script,iframe");
    expect(
      htmlTagsOption.validate("<p>Paragraph</p><div>Division</div>")
    ).toBeTruthy();
    expect(
      htmlTagsOption.validate("<script>Alert('Hello')</script>")
    ).toBeFalsy();
  });

  test("handles combination of allowed and restricted tags correctly", () => {
    htmlTagsOption.allowTags("p,div");
    htmlTagsOption.restrictTags("script");
    expect(
      htmlTagsOption.validate("<p>Allowed</p><script>Not Allowed</script>")
    ).toBeFalsy();
    expect(htmlTagsOption.validate("<div>Allowed</div>")).toBeTruthy();
  });
});
