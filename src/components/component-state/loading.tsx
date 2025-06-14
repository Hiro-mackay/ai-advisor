import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {
  type: "card" | "table" | "page";
  options?: {
    displayCount?: number;
  };
};

const DEFAULT_DISPLAY_COUNT = 4;

export function LoadingState({ type, options }: Props) {
  switch (type) {
    case "card":
      return (
        <LoadingCard
          displayCount={options?.displayCount ?? DEFAULT_DISPLAY_COUNT}
        />
      );
    case "table":
      return (
        <LoadingTable
          displayCount={options?.displayCount ?? DEFAULT_DISPLAY_COUNT}
        />
      );
    case "page":
      return <LoadingPage />;
    default:
      return <LoadingPage />;
  }
}

function LoadingTable({ displayCount }: { displayCount: number }) {
  return (
    <Card className="divide-y gap-0 p-0">
      {Array.from({ length: displayCount }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </Card>
  );
}

function LoadingCard({ displayCount }: { displayCount: number }) {
  return (
    <div className="flex gap-x-4 gap-y-8 flex-wrap ">
      {Array.from({ length: displayCount }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingPage() {
  return <Skeleton className="w-full h-full" />;
}
