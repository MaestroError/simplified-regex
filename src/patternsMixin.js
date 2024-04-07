const patternsMixin = {
  // Predefined patterns as methods
  email(maxLength = null, onlyDomains = [], onlyExtensions = []) {
    // this.setPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}");
    const regex = new this.constructor();
    regex
      .charSet((reg) => {
        reg.alphanumeric().underscore().percent().plus().minus();
      }, "1+")
      .atSign()
      .charSet((reg) => {
        reg.alphanumeric().dot().minus();
      }, "1+")
      .dot()
      .charSet((reg) => {
        reg.text();
      }, "2,10");

    this.setPattern(regex.toRegex());

    this.setOptions({
      maxLength: maxLength,
      onlyDomains: onlyDomains,
      onlyExtensions: onlyExtensions,
    });

    return this;
  },

  url(onlyProtocol = []) {
    // this.setPattern("(https?://[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(/[a-zA-Z0-9/]*)?)");

    const regex = new this.constructor();

    // Common part of the URL pattern: domain name and optional path
    regex
      .exact("http")
      .exact("s", true, "?")
      .colon()
      .forwardSlash()
      .forwardSlash()
      .charSet((reg) => {
        reg.alphanumeric().dot().minus();
      }, "1+")
      .dot()
      .charSet((reg) => {
        reg.text();
      }, "2,6") // For simplicity, assuming TLD lengths of 2 to 6 characters
      .nonCapturingGroup((reg) => {
        reg.forwardSlash().charSet((reg) => {
          reg.alphanumeric().hyphen().underscore().forwardSlash();
        }, "*");
      }, "?");

    // Assuming setPattern constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Here we set the options; modify this part based on how your setOptions method works
    this.setOptions({
      onlyProtocol: onlyProtocol,
    });

    return this;
  },

  creditCardNumber(cardTypes = "") {
    const regex = new this.constructor();

    // Define the generic pattern for credit card numbers
    regex
      .nonCapturingGroup((reg) => {
        reg
          .nonCapturingGroup((reg) => {
            reg
              // Visa: Starts with 4
              .nonCapturingGroup((reg) => {
                reg.exact("4").digits(3);
              })
              .or()
              // MasterCard: Starts with 51 through 55
              .nonCapturingGroup((reg) => {
                reg
                  .exact("5")
                  .charSet((reg) => {
                    reg.exact("1").hyphen().exact("5");
                  })
                  .digits(2);
              })
              .or()
              // Discover: Starts with 6011 or 65
              .nonCapturingGroup((reg) => {
                reg.exact("6").nonCapturingGroup((reg) => {
                  reg.exact("011").or().exact("5").digits(2);
                });
              });
          })
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(4);
      })
      .or()
      // AMEX part:
      .nonCapturingGroup((reg) => {
        reg
          .nonCapturingGroup((reg) => {
            reg
              .exact("3")
              .charSet((reg) => {
                reg.exact("47");
              })
              .digits(2);
          })
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(6)
          .charSet((reg) => {
            reg.hyphen().space();
          }, "?")
          .digits(5);
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Set options, including cardTypes which can be used for further validation or filtering
    this.setOptions({
      allowCardTypes: cardTypes,
    });

    return this;
  },

  currency(minDigits = null, maxDigits = null, specificCurrencies = []) {
    const regex = new this.constructor();

    // Use addRawRegex for the Unicode property escape for currency symbols
    regex.addRawRegex("(?:\\p{Sc}){1}");

    this.asUnicode(); // To make "p{Sc}" work

    // Optional space
    regex.space("?");

    // Match numeric value with optional thousands separator commas
    regex
      .charSet((reg) => {
        reg.digits().comma();
      }, "+")
      .nonCapturingGroup((reg) => {
        reg.dot().digitsRange(1, 3); // Decimal part, up to 3 digits
      }, "?")
      .wordBoundary(); // Assuming wordBoundary() is a method to add "\b"

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Pass options without processing them within this method
    this.setOptions({
      minDigits: minDigits,
      maxDigits: maxDigits,
      specificCurrencies: specificCurrencies,
    });

    return this;
  },

  date() {
    const regex = new this.constructor();

    // Start building the regex pattern
    regex
      // Group for YY(YY)-MM-DD format
      .nonCapturingGroup((reg) => {
        reg
          .digitsRange(2, 4) // Year
          .charSet((reg) => {
            // Separator
            reg.hyphen().forwardSlash().dot();
          })
          .digits(2) // Month
          .charSet((reg) => {
            // Separator
            reg.hyphen().forwardSlash().dot();
          })
          .digits(2); // Day
      })
      .or()
      // Group for DD-MM-YYYY or DD-MM-YY format
      .nonCapturingGroup((reg) => {
        reg
          .digits(2) // Day
          .charSet((reg) => {
            // Separator
            reg.hyphen().forwardSlash().dot();
          })
          .digits(2) // Month
          .charSet((reg) => {
            // Separator
            reg.hyphen().forwardSlash().dot();
          })
          .digitsRange(2, 4); // Year, allowing two or four digits
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // No additional options for this pattern, but you can extend the method to accept and process options if necessary
    return this;
  },

  domainName(maxLength = null, onlyDomains = [], onlyExtensions = []) {
    const regex = new this.constructor();

    // Start constructing the domain name pattern
    // Optional subdomains part: ([a-zA-Z0-9-]+\.)*
    regex
      .nonCapturingGroup((reg) => {
        reg
          .charSet((set) => {
            set.alphanumeric().hyphen().dot();
          }, "+")
          .dot();
      }, "*")
      // Main domain part: [a-zA-Z0-9-]+
      .charSet((reg) => {
        reg.alphanumeric().hyphen();
      }, "+")
      .dot()
      // Top-level domain (TLD) part: [a-zA-Z]{2,}
      .nonCapturingGroup((reg) => {
        reg.textRange(2, 6);
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Set options without directly processing them in the pattern
    this.setOptions({
      maxLength: maxLength,
      onlyDomains: onlyDomains,
      onlyExtensions: onlyExtensions,
    });

    return this;
  },

  filePath(isDirectory = false, isFile = false, pathType = null) {
    const regex = new this.constructor();

    // Start constructing the file path pattern
    regex
      // Optional leading character for Unix-like paths
      .nonCapturingGroup((reg) => {
        reg.exact("~").or().forwardSlash();
      }, "?")
      // Main part of the path
      .nonCapturingGroup((reg) => {
        reg
          .addRawRegex('[^/:*,?"<>|\\r\\n\\s]+') // Match valid path characters
          .nonCapturingGroup((reg) => {
            reg.forwardSlash().addRawRegex('[^/:*,?"<>|\\r\\n\\s]+');
          }, "+"); // Match one or more path segments
      })
      // Optional trailing slash or file extension
      .nonCapturingGroup((reg) => {
        reg
          .forwardSlash()
          .or()
          .nonCapturingGroup((reg) => {
            reg.dot().alphanumeric().plus(); // Match file extension
          });
      }, "?");

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Pass options without directly processing them in the pattern
    this.setOptions({
      isDirectory: isDirectory,
      isFile: isFile,
      pathType: pathType,
    });

    return this;
  },

  filePathWin(isDirectory = false, isFile = false) {
    const regex = new this.constructor();

    // Start constructing the Windows file path pattern
    regex
      // Negative lookahead to prevent consecutive backslashes or forward slashes
      .negativeLookAhead((reg) => {
        reg.dot("*").exact("\\\\").or().forwardSlash().forwardSlash();
      })
      // Optional drive letter
      .charSet((reg) => {
        reg.alphanumeric();
      }, "*")
      // Match the drive letter and colon or a single dot for current directory
      .nonCapturingGroup((reg) => {
        reg.alphanumeric(0).colon().or().dot();
      }, "?")
      .backslash()
      // Match the rest of the path
      .nonCapturingGroup((reg) => {
        reg
          .addRawRegex('[^:*,?"<>|\\r\\n]*') // Exclude characters not allowed in file paths
          .backslash("?");
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Pass options without directly processing them in the pattern
    this.setOptions({
      isDirectory: isDirectory,
      isFile: isFile,
    });

    return this;
  },

  htmlTag(restrictTags = [], onlyTags = []) {
    const regex = new this.constructor();

    // Constructing the HTML tag pattern
    regex
      // Opening tag
      .exact("<")
      .group((reg) => {
        // Match any tag name
        reg.charSet((set) => {
          set.alphanumeric();
        }, "+");
      })
      // Attributes within the tag
      .negativeCharSet((reg) => {
        reg.closeAngleBracket(">");
      }, "*")
      .exact(">")
      // Tag content
      .nonCapturingGroup((reg) => {
        reg.addRawRegex("(.*?)");
      })
      // Closing tag
      .exact("</")
      .addRawRegex("\\1")
      .exact(">");

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Pass options without directly processing them in the pattern
    this.setOptions({
      restrictTags: restrictTags,
      onlyTags: onlyTags,
    });

    return this;
  },

  ipAddress() {
    const regex = new this.constructor();

    // Start constructing the IPv4 pattern
    regex
      .wordBoundary() // Start of the boundary for the IP address
      .nonCapturingGroup((reg) => {
        reg
          // Match the first three octets
          .nonCapturingGroup((reg) => {
            reg
              .exact("25")
              .charSet((reg) => {
                reg.addRawRegex("0-5");
              })
              .or()
              .exact("2")
              .charSet((reg) => {
                reg.addRawRegex("0-4");
              })
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              })
              .or()
              .charSet((reg) => {
                reg.addRawRegex("01");
              }, "?")
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              })
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              }, "?")
              .dot();
          }, "3")
          .nonCapturingGroup((reg) => {
            reg
              .exact("25")
              .charSet((reg) => {
                reg.addRawRegex("0-5");
              })
              .or()
              .exact("2")
              .charSet((reg) => {
                reg.addRawRegex("0-4");
              })
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              })
              .or()
              .charSet((reg) => {
                reg.addRawRegex("01");
              }, "?")
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              })
              .charSet((reg) => {
                reg.addRawRegex("0-9");
              }, "?");
          });
      })
      .wordBoundary(); // End of the boundary for the IP address

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // As there are no specific arguments for this pattern, we don't need to pass any options
    return this;
  },

  ipv6Address() {
    const regex = new this.constructor();

    // Start constructing the IPv6 pattern
    regex
      .wordBoundary() // Start of the boundary for the IPv6 address
      .nonCapturingGroup((reg) => {
        reg
          .addRawRegex("[0-9a-fA-F]{1,4}") // Match hexadecimal digits
          .colon();
      }, "7") // Repeat for the first 7 groups
      .addRawRegex("[0-9a-fA-F]{1,4}")
      .wordBoundary(); // End of the boundary for the IPv6 address

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    return this;
  },

  password(
    minLength = 0,
    minUppercase = 0,
    minDigits = 0,
    minSpecialChars = 0
  ) {
    const regex = new this.constructor();

    // The character set includes alphanumeric characters and specified special characters
    regex.charSet((reg) => {
      reg.alphanumeric().addRawRegex('!@#$%^&*(),.?":{}|<>');
    }, "oneOrMore");

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Directly pass the constraints as options for external validation
    this.setOptions({
      minLength: minLength,
      minUppercase: minUppercase,
      minDigits: minDigits,
      minSpecialChars: minSpecialChars,
    });

    return this;
  },

  phone(countryCode = "") {
    const regex = new this.constructor();

    // Start constructing the phone pattern
    // Part 1: International Prefix
    regex
      .nonCapturingGroup((reg) => {
        reg.addRawRegex("[+\\d]"); // Matches "+" or digit
      }, "1,4")
      // Part 2: Optional Separator
      .charSet((reg) => {
        reg.space().hyphen();
      }, "?")
      // Part 3: Area Code
      .nonCapturingGroup((reg) => {
        reg.addRawRegex("[()\\d]"); // Matches "(", ")", or digit
      }, "1,5")
      // Part 4: Main Number
      .addRawRegex("[- \\d]{4,23}"); // Matches combination of space, dash, and digits

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    // Directly pass the countryCode as an option for external validation
    this.setOptions({
      countryCode: countryCode,
    });

    return this;
  },

  time() {
    const regex = new this.constructor();

    // Start constructing the time pattern
    regex
      .nonCapturingGroup((reg) => {
        reg
          // Match 00-19 or 01-09 with an optional leading '0'
          .nonCapturingGroup((reg) => {
            reg.addRawRegex("[01]?[0-9]").or().addRawRegex("2[0-3]");
          });
      })
      .or()
      // Match minutes
      .colon()
      .addRawRegex("[0-5][0-9]")
      // Optionally match seconds
      .nonCapturingGroup((reg) => {
        reg.colon().addRawRegex("[0-5][0-9]");
      }, "?")
      // Optionally match AM or PM with an optional leading space
      .nonCapturingGroup((reg) => {
        reg.space("?").nonCapturingGroup((reg) => {
          reg.addRawRegex("AM").or().addRawRegex("PM");
        });
      }, "?");

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    return this;
  },

  username() {
    const regex = new this.constructor();

    // Start with a word boundary
    regex
      .wordBoundary()
      // Add character set for the username
      .charSet((reg) => {
        reg.alphanumeric().addRawRegex("_-"); // Assuming addRawRegex allows for adding characters directly
      }, "4,15") // Specify the length constraint
      // End with a word boundary
      .wordBoundary()
      // Add negative lookahead to ensure username isn't followed by special characters
      .negativeLookAhead((reg) => {
        reg.addRawRegex("[!@#$%^&*().]"); // List of characters not allowed to follow the username
      });

    // Constructs the actual regex pattern from the builder and sets it
    this.setPattern(regex.toRegex());

    return this;
  },
};

export default patternsMixin;
