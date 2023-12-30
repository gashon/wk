export const groupBy = <T extends Record<string, any>>(
  key: keyof T,
  arr: T[],
): Record<string, T[]> => {
  return arr.reduce(
    (accumulator, current) => {
      const keyValue = current[key];

      if (!accumulator[keyValue]) {
        accumulator[keyValue] = [];
      }

      accumulator[keyValue].push(current);

      return accumulator;
    },
    {} as Record<string, T[]>,
  );
};
