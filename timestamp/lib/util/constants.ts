export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const TOKENS = new Map([
  ["Y", 4],
  ["Q", 1],
  ["M", 4],
  ["D", 4],
  ["d", 4],
  ["X", 1],
  ["x", 1],
  ["H", 2],
  ["h", 2],
  ["a", 1],
  ["A", 1],
  ["m", 2],
  ["s", 2],
  ["S", 3],
  ["Z", 2],
  ["l", 4],
  ["L", 4],
  ["T", 1],
  ["t", 1],
]);
