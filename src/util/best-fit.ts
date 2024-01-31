import type { BodyWeight } from "@/types";

export const mean = (arr: number[]): number =>
  arr.reduce((acc, val) => acc + val, 0) / arr.length;

export const linearRegression = <T>(
  key: keyof T,
  data: T[],
): { slope: number; intercept: number } => {
  const x = data.map((_, index) => index);
  const y = data.map((item) => item[key] as number);
  const xMean = mean(x);
  const yMean = mean(y);
  const slope =
    x.reduce((acc, xVal, idx) => acc + (xVal - xMean) * (y[idx] - yMean), 0) /
    x.reduce((acc, xVal) => acc + Math.pow(xVal - xMean, 2), 0);
  const intercept = yMean - slope * xMean;
  return { slope, intercept };
};

export const generateBestFitLineData = <T>(
  data: T[],
  slope: number,
  intercept: number,
): (T & { bestFit: number })[] => {
  return data.map((item, index) => ({
    ...item,
    bestFit: Number((slope * index + intercept).toFixed(1)),
  }));
};
