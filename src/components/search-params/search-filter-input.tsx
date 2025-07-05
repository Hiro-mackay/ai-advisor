import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { useTableFilter } from "@/hooks/use-table-filter";
import { useRef } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { XIcon } from "lucide-react";

type Props = {
  placeholder?: string;
  defaultSearch?: string;
  defaultPage?: number;
  defaultLimit?: number;
};

export function SearchFilterInput({
  placeholder = "Filter by...",
  defaultSearch,
  defaultPage,
  defaultLimit,
}: Props) {
  const [filters, setFilters] = useTableFilter(
    defaultSearch,
    defaultPage,
    defaultLimit
  );
  const ref = useRef<HTMLInputElement>(null);
  const debouncedOnChange = useDebouncedInput((value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  });

  return (
    <div className="relative max-w-xs">
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="px-7"
        defaultValue={filters.search}
        onChange={debouncedOnChange}
        placeholder={placeholder}
        ref={ref}
      />
      {filters.search && (
        <XIcon
          className="size-4 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground "
          onClick={() => {
            setFilters({ search: "", page: 1 });
            if (ref.current) {
              ref.current.value = "";
            }
          }}
        />
      )}
    </div>
  );
}
