import proc from "node:process";
import { mergeDefault } from "../../../utils/mod.ts";

import type { ConsoleOptions, ConsoleOptionsColor } from "../CorryeConsole.ts";

const colorBase: ConsoleOptionsColor = {
  shard: { background: "cyan", text: "black" },
  message: { style: "normal", text: "white" },
  time: {},
};

export const ConsoleDefaults: Partial<ConsoleOptions> = {
  stdout: proc.stdout,
  stderr: proc.stderr,
  timestamps: true,
  utc: false,
  colors: {
    log: mergeDefault(colorBase, {
      time: {
        background: "magenta",
        text: "black",
      },
    }),
    info: mergeDefault(colorBase, {
      time: {
        background: "cyan",
        text: "black",
      },
    }),
    warn: mergeDefault(colorBase, {
      time: {
        background: "lightyellow",
        text: "black",
      },
    }),
    debug: mergeDefault(colorBase, {
      time: {
        background: "green",
        text: "black",
      },
    }),
    error: mergeDefault(colorBase, {
      time: {
        background: "red",
        text: "black",
      },
    }),
    wtf: mergeDefault(colorBase, {
      time: {
        background: "red",
        text: "black",
      },
    }),
    verbose: mergeDefault(colorBase, {
      time: {
        background: "lightgray",
        text: "black",
      },
    }),
  },
};

export const ConsoleTypes = {
  log: "log",
  info: "info",
  debug: "debug",
  warn: "warn",
  error: "error",
  wtf: "error",
  verbose: "log",
};
