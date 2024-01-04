export const reverseAndDeepCopy = <T extends any[]>(arr: T): T => {
  const deepCopy = JSON.parse(JSON.stringify(arr));

  return deepCopy.reverse();
};
