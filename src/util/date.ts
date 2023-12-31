export const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getEndOfDay = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );

export const getSevenDaysFromNow = (): Date =>
  getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)));

export const getOneYearFromNow = (): Date =>
  getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 365)));

export const formatDate = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // getMonth() returns 0-11 for Jan-Dec, so add 1
  const day: number = date.getDate();

  const paddedMonth: string = month < 10 ? "0" + month : month.toString();
  const paddedDay: string = day < 10 ? "0" + day : day.toString();

  return `${year}-${paddedMonth}-${paddedDay}`;
};
