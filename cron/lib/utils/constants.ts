export const partRegex = /^(?:(\*)|(\d+)(?:-(\d+))?)(?:\/(\d+))?$/;
export const wildcardRegex = /\bh\b|\B\?\B/g;
export const allowedNum = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];

export const predefined: Record<string, string> = {
  "@annually": "0 0 1 1 *",
  "@yearly": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@hourly": "0 * * * *",
};

export const tokens: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const DAY = 1000 * 60 * 60 * 24;

export const tokensRegex = new RegExp(Object.keys(tokens).join("|"), "g");
