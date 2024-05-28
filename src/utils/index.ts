// Delay function to simulate a delay
export function delay(ms = 0) {
  return function () {
    return new Promise((resolve) => setTimeout(() => resolve(true), ms));
  };
}

// Check if the code is running on the server side
export const runsOnServerSide = typeof window === "undefined";

// Remove duplicates from an array of objects
export function removeDuplicatesFromArrayObjects<T>(
  array: T[],
  key: keyof T | never
) {
  const lookup = new Set();

  return array.filter(
    (value) => !lookup.has(value[key]) && lookup.add(value[key])
  );
}
