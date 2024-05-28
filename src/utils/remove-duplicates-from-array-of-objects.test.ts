import { removeDuplicatesFromArrayObjects } from ".";

describe("removeDuplicatesFromArrayObjects", () => {
  it("should remove duplicates from an array of objects based on the specified key", () => {
    const array = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
    ];

    const result = removeDuplicatesFromArrayObjects(array, "name");

    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]);
  });

  it("should return the original array if the key is not present in the objects", () => {
    const array = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
    ];
    // @ts-expect-error Testing for a missing key
    const result = removeDuplicatesFromArrayObjects(array, "age");

    expect(result).toEqual(array);
  });

  it("should return an empty array if the input array is empty", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const array: any[] = [];

    const result = removeDuplicatesFromArrayObjects(array, "name");

    expect(result).toEqual([]);
  });
});
