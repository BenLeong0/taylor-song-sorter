export function chooseRandom<T>(arr: T[]): T {
  const ind = Math.floor(Math.random() * arr.length);
  return arr[ind];
}

export function shuffleArr<T>(arr: T[], seed: number): T[] {
  return arr
    .map((value, i) => ({ value, sort: (Math.sin(i) * seed) % 1 }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
