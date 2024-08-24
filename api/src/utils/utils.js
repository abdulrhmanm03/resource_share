export function stringToWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== " ");
}
