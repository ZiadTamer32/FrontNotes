export function getInitial(name) {
  const initial = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initial;
}
