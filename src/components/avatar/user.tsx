import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "better-auth";
import { GeneratedAvatar } from "./generated";

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={user.image ?? undefined} alt={user.name} />
      <AvatarFallback>
        <GeneratedAvatar seed={user.name} />
      </AvatarFallback>
    </Avatar>
  );
}
