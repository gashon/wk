export const normalize = (arr: number[]): number[] => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  return arr.map((val) => (val - min) / (max - min));
};
