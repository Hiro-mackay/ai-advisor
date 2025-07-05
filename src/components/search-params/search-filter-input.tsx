import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { XIcon } from "lucide-react";

type Props = {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export function SearchFilterInput({
  placeholder = "Filter by...",
  defaultValue,
  onChange,
}: Props) {
  const [isDirty, setIsDirty] = useState(!!defaultValue);
  const debouncedOnChange = useDebouncedInput((value) => {
    onChange(value);
    setIsDirty(!!value);
  });

  const handleClear = () => {
    onChange("");
    setIsDirty(false);
  };

  return (
    <div className="relative max-w-xs">
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="px-7"
        defaultValue={defaultValue}
        onChange={debouncedOnChange}
        placeholder={placeholder}
      />
      {isDirty && (
        <XIcon
          className="size-4 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground "
          onClick={handleClear}
        />
      )}
    </div>
  );
}
