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

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b);
}

export function* binaryPairings(length: number) {
  for (let n = 0; n < Math.log2(length); n++) {
    for (let l = 0; l < length; l += 2 ** (n + 1)) {
      const r = l + 2 ** (n + 1);
      yield { l, r };
    }
  }
}
