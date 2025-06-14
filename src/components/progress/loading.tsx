import { Loader2 } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export function Loading({ title, description }: Props) {
  return (
    <div className="px-4 py-8 flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-2 gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2 className="h-6 w-6 animate-spin" />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-lg ">{title}</p>
          <p className="text-sm ">{description}</p>
        </div>
      </div>
    </div>
  );
}
