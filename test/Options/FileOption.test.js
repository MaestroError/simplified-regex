import FileOption from "../../src/Options/FileOption";

describe("FileOption Tests", () => {
  let fileOption;

  beforeEach(() => {
    fileOption = new FileOption();
  });

  test("validate correctly identifies files with specific extension", () => {
    fileOption.isFile("txt");
    expect(fileOption.validate("document.txt")).toBeTruthy();
    expect(fileOption.validate("image.png")).toBeFalsy();
  });

  test("validate correctly identifies any file type when no extension specified", () => {
    fileOption.isFile();
    expect(fileOption.validate("document.txt")).toBeTruthy();
    expect(fileOption.validate("image.png")).toBeTruthy();
    expect(fileOption.validate("folder/")).toBeFalsy(); // Fails because it's a directory
  });

  test("validate correctly identifies directory paths", () => {
    fileOption.isDirectory();
    expect(fileOption.validate("folder/")).toBeTruthy();
    expect(fileOption.validate("folder/subfolder/")).toBeTruthy();
    expect(fileOption.validate("file.txt")).toBeFalsy(); // Fails because it's a file
  });

  test("build function returns the correct regex pattern for file types", () => {
    fileOption.isFile("jpg");
    expect(fileOption.build()).toMatch(
      new RegExp(`[A-Za-z0-9/:\.\-\\\\]*\.jpg`).source
    );
  });

  test("build function returns the correct regex pattern for directories", () => {
    fileOption.isDirectory();
    expect(fileOption.build()).toMatch("(?:[a-zA-Z0-9/:-\\\\]+)+");
  });

  test("validate allows all types if no specific file or directory check is set", () => {
    expect(fileOption.validate("anything")).toBeTruthy();
  });
});
