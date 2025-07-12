import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";

export function CallCompleteCard() {
  return (
    <Alert variant="default">
      <CircleCheckIcon />
      <AlertTitle>Call has ended!</AlertTitle>
      <AlertDescription>
        Thank you for your time. You can review the call and share the recording
        with your team.
      </AlertDescription>
      <AlertDescription className="pt-2">
        <Button asChild size="sm">
          <Link href="/meetings">Back to meetings</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
