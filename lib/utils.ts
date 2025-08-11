/**
 * A generic debounce function.
 * @param fn The function to debounce.
 * @param w The debounce wait time in milliseconds.
 * @returns A debounced version of the function.
 */
export const debounce = <T extends (...a: any) => any>(fn: T, w = 300) => {
  let t: any;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), w);
  };
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param n The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
