const BASE_81_DIGITS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@£$%^&*()[]{},.;:";

export function convert3to81(s3: string): string {
  const s3Length = Math.ceil(s3.length / 4) * 4;
  const paddedS3 = s3.padStart(s3Length, "0");
  const paddingLength = s3Length - s3.length;

  let s81 = "";
  s81 += paddingLength.toString(); // first char is padding amount
  for (let i = 0; i < s3Length; i += 4) {
    const packet3 = paddedS3.slice(i, i + 4);
    const packet10 = parseInt(packet3, 3);
    const packet81 = BASE_81_DIGITS[packet10];
    s81 += packet81;
  }

  return s81;
}

export function convert81to3(s81: string): string {
  const paddingLength = parseInt(s81[0]);
  const s81Value = s81.slice(1);
  const s3 = s81Value
    .split("")
    .map((d) => BASE_81_DIGITS.indexOf(d).toString(3).padStart(4, "0"))
    .join("");

  const s3Padding = s3.slice(0, paddingLength);
  if (s3Padding.split("").some((x) => x !== "0")) {
    throw Error(`Padding failed - should start with ${paddingLength} zeros`);
  }

  return s3.slice(paddingLength);
}
