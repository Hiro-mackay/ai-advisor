import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarUI,
} from "@/components/ui/avatar";
import { User } from "better-auth";
import { GeneratedAvatar } from "./generated";

export function Avatar({ user }: { user: User }) {
  return (
    <AvatarUI className="h-8 w-8 rounded-lg">
      <AvatarImage src={user.image ?? undefined} alt={user.name} />
      <AvatarFallback>
        <GeneratedAvatar user={user} />
      </AvatarFallback>
    </AvatarUI>
  );
}
