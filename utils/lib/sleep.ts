export const Sleep = (ms: number) =>
  Promise.resolve(setTimeout(() => null, ms));
