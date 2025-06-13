import { ErrorState } from "@/components/error/error-state";

export function AgentsErrorState() {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
}
