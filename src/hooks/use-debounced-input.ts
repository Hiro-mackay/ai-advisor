import { useDebouncedCallback } from "use-debounce";

export function useDebouncedInput(
  onChange: (value: string) => void,
  delay: number = 600
) {
  return useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, delay);
}
