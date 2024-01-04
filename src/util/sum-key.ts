export const sumFromKey = <T extends Object>(key: keyof T, objArr: T[]) => {
  let sum = 0;

  for (const obj of objArr) {
    const val = obj[key];

    if (val === undefined || val === "") continue;

    if (typeof val === "number") sum += val;
    else if (typeof val === "string") sum += parseFloat(val);
    else throw new Error("invalid key entry");
  }

  return sum;
};
