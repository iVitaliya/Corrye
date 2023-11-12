// deno-lint-ignore-file no-explicit-any
import * as constants from "./util/constants.ts";

const tokens = new Map([
  // Dates
  ["Y", (time: Date) => String(time.getFullYear()).slice(2)],
  ["YY", (time: Date) => String(time.getFullYear()).slice(2)],
  ["YYY", (time: Date) => String(time.getFullYear())],
  ["YYYY", (time: Date) => String(time.getFullYear())],
  ["Q", (time: Date) => String((time.getMonth() + 1) / 3)],
  ["M", (time: Date) => String(time.getMonth() + 1)],
  ["MM", (time: Date) => String(time.getMonth() + 1).padStart(2, "0")],
  ["MMM", (time: Date) => constants.MONTHS[time.getMonth()]],
  ["MMMM", (time: Date) => constants.MONTHS[time.getMonth()]],
  ["D", (time: Date) => String(time.getDate())],
  ["DD", (time: Date) => String(time.getDate()).padStart(2, "0")],
  [
    "DDD",
    (time: Date) =>
      String(
        Math.floor(
          (time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) /
            constants.DAY,
        ),
      ),
  ],
  [
    "DDDD",
    (time: Date) =>
      String(
        Math.floor(
          (time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) /
            constants.DAY,
        ),
      ),
  ],
  ["d", (time: Date) => {
    const day = String(time.getDate());

    if (day !== "11" && day.endsWith("1")) {
      return `${day}st`;
    }

    if (day !== "12" && day.endsWith("2")) {
      return `${day}nd`;
    }

    if (day !== "13" && day.endsWith("3")) {
      return `${day}rd`;
    }

    return `${day}th`;
  }],
  ["dd", (time: Date) => constants.DAYS[time.getDay()].slice(0, 2)],
  ["ddd", (time: Date) => constants.DAYS[time.getDay()].slice(0, 3)],
  ["dddd", (time: Date) => constants.DAYS[time.getDay()]],
  ["X", (time: Date) => String(time.valueOf() / constants.SECOND)],
  ["x", (time: Date) => String(time.valueOf())],
  // Locales
  ["H", (time: Date) => String(time.getHours())],
  ["HH", (time: Date) => String(time.getHours()).padStart(2, "0")],
  ["h", (time: Date) => String(time.getHours() % 12 || 12)],
  ["hh", (time: Date) => String(time.getHours() % 12 || 12).padStart(2, "0")],
  ["a", (time: Date) => time.getHours() < 12 ? "am" : "pm"],
  ["A", (time: Date) => time.getHours() < 12 ? "AM" : "PM"],
  ["m", (time: Date) => String(time.getMinutes())],
  ["mm", (time: Date) => String(time.getMinutes()).padStart(2, "0")],
  ["s", (time: Date) => String(time.getSeconds())],
  ["ss", (time: Date) => String(time.getSeconds()).padStart(2, "0")],
  ["S", (time: Date) => String(time.getMilliseconds())],
  ["SS", (time: Date) => String(time.getMilliseconds()).padStart(2, "0")],
  ["SSS", (time: Date) => String(time.getMilliseconds()).padStart(3, "0")],
  [
    "T",
    (time: Date) =>
      `${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      } ${time.getHours() < 12 ? "AM" : "PM"}`,
  ],
  [
    "t",
    (time: Date) =>
      `${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      }:${String(time.getSeconds()).padStart(2, "0")} ${
        time.getHours() < 12 ? "am" : "pm"
      }`,
  ],
  [
    "L",
    (time: Date) =>
      `${String(time.getMonth() + 1).padStart(2, "0")}/${
        String(time.getDate()).padStart(2, "0")
      }/${String(time.getFullYear())}`,
  ],
  [
    "l",
    (time: Date) =>
      `${String(time.getMonth() + 1)}/${
        String(time.getDate()).padStart(2, "0")
      }/${String(time.getFullYear())}`,
  ],
  [
    "LL",
    (time: Date) =>
      `${constants.MONTHS[time.getMonth()]} ${
        String(time.getDate()).padStart(2, "0")
      }, ${String(time.getFullYear())}`,
  ],
  [
    "ll",
    (time: Date) =>
      `${constants.MONTHS[time.getMonth()].slice(0, 3)} ${
        String(time.getDate()).padStart(2, "0")
      }, ${String(time.getFullYear())}`,
  ],
  [
    "LLL",
    (time: Date) =>
      `${constants.MONTHS[time.getMonth()]} ${
        String(time.getDate()).padStart(2, "0")
      }, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      } ${time.getHours() < 12 ? "AM" : "PM"}`,
  ],
  [
    "lll",
    (time: Date) =>
      `${constants.MONTHS[time.getMonth()].slice(0, 3)} ${
        String(time.getDate()).padStart(2, "0")
      }, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      } ${time.getHours() < 12 ? "AM" : "PM"}`,
  ],
  [
    "LLLL",
    (time: Date) =>
      `${constants.DAYS[time.getDay()]}, ${constants.MONTHS[time.getMonth()]} ${
        String(time.getDate()).padStart(2, "0")
      }, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      } ${time.getHours() < 12 ? "AM" : "PM"}`,
  ],
  [
    "llll",
    (time: Date) =>
      `${constants.DAYS[time.getDay()].slice(0, 3)} ${
        constants.MONTHS[time.getMonth()].slice(0, 3)
      } ${String(time.getDate()).padStart(2, "0")}, ${
        String(time.getFullYear())
      } ${String(time.getHours() % 12 || 12)}:${
        String(time.getMinutes()).padStart(2, "0")
      } ${time.getHours() < 12 ? "AM" : "PM"}`,
  ],
  ["Z", (time: Date) => {
    const offset = time.getTimezoneOffset();
    const unsigned = offset >= 0, absolute = Math.abs(offset);
    return `${unsigned ? "+" : "-"}${
      String(Math.floor(absolute / 60)).padStart(2, "0")
    }:${String(absolute % 60).padStart(2, "0")}`;
  }],
  ["ZZ", (time: Date) => {
    const offset = time.getTimezoneOffset();
    const unsigned = offset >= 0, absolute = Math.abs(offset);
    return `${unsigned ? "+" : "-"}${
      String(Math.floor(absolute / 60)).padStart(2, "0")
    }:${String(absolute % 60).padStart(2, "0")}`;
  }],
]);

/** Corrye's Timestamp class, parses the pattern once, displays the desired Date or UNIX timestamp with the selected pattern. */
export class Timestamp {
  private pattern: string;
  private _template: ({
    type: string;
    content: null;
  } | {
    type: string;
    content: string;
  })[];

  /**
   * Starts a new {@link Timestamp} and parses the pattern.
   * @since 0.1.1
   * @param pattern The pattern to parse. */
  public constructor(pattern: string) {
    this.pattern = pattern;
    this._template = Timestamp._parse(pattern);
  }

  /**
   * Display the current date with the current pattern.
   * @since 0.1.1
   * @param time The time to display. */
  public display(time = new Date()) {
    return Timestamp._display(this._template, time);
  }

  /**
   * Display the current date utc with the current pattern.
   * @since 0.1.1
   * @param time The time to display in utc. */
  public displayUTC(time: Date) {
    return Timestamp._display(this._template, Timestamp.utc(time));
  }

  /**
   * Edits the current pattern.
   * @since 0.1.1
   * @param pattern The new pattern for this instance.
   * @chainable */
  public edit(pattern: string) {
    this.pattern = pattern;
    this._template = Timestamp._parse(pattern);

    return this;
  }
  /**
   * Defines the toString behavior of Timestamp.
   * @since 0.1.1 */
  public toString() {
    return this.display();
  }
  /**
   * Display the current date with the current pattern.
   * @since 0.1.1
   * @param pattern The pattern to parse.
   * @param time The time to display. */
  public static displayArbitrary(pattern: string, time = new Date()) {
    return Timestamp._display(Timestamp._parse(pattern), time);
  }
  /**
   * Creates a UTC Date object to work with.
   * @since 0.1.1
   * @param time The date to convert to utc. */
  public static utc(time = new Date()) {
    time = Timestamp._resolveDate(time);

    return new Date(time.valueOf() + (time.getTimezoneOffset() * 60000));
  }
  /**
   * Display the current date with the current pattern.
   * @since 0.1.1
   * @param template The pattern to parse.
   * @param time The time to display. */
  private static _display(template: any, time: Date) {
    let output = "";
    const parsedTime = Timestamp._resolveDate(time);

    for (const { content, type } of template) {
      output += content || tokens.get(type as any)!(parsedTime);
    }

    return output;
  }
  /**
   * Parses the pattern.
   * @since 0.1.1
   * @param pattern The pattern to parse. */
  private static _parse(pattern: string) {
    const template = [];

    for (let i = 0; i < pattern.length; i++) {
      let current = "";
      const currentChar = pattern[i];
      const tokenMax = constants.TOKENS.get(currentChar);

      if (typeof tokenMax === "number") {
        current += currentChar;

        while (pattern[i + 1] === currentChar && current.length < tokenMax) {
          current += pattern[++i];
        }

        template.push({ type: current, content: null });
      } else if (currentChar === "[") {
        while (i + 1 < pattern.length && pattern[i + 1] !== "]") {
          current += pattern[++i];
        }
        i++;

        template.push({ type: "literal", content: current });
      } else {
        current += currentChar;

        while (
          i + 1 < pattern.length && !constants.TOKENS.has(pattern[i + 1]) &&
          pattern[i + 1] !== "["
        ) {
          current += pattern[++i];
        }
        template.push({ type: "literal", content: current });
      }
    }

    return template;
  }
  /**
   * Resolves a date.
   * @since 0.5.0
   * @param time The time to parse
   */
  private static _resolveDate(time: Date) {
    return time instanceof Date ? time : new Date(time);
  }
}
