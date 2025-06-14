import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  className?: string;
  changePage: (page: number) => void;
  changeLimit: (limit: number) => void;
};

export function Pagination({
  page,
  limit,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  changePage,
  changeLimit,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        Page {page} of {totalPages}
      </div>

      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) => changeLimit(Number(value))}
          >
            <SelectTrigger
              defaultValue={limit.toString()}
              className="border-none shadow-none cursor-pointer"
            >
              <SelectValue /> rows
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="icon"
          disabled={!hasPreviousPage}
          onClick={() => changePage(page - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!hasNextPage}
          onClick={() => changePage(page + 1)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
