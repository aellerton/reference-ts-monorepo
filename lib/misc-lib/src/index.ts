export const addFunc = (a: number, b: number): number => {
  return a + b;
};

export const helloWorld = (name?: string): string => {
  return `Hello ${name || "World"} from misc-lib`;
};
