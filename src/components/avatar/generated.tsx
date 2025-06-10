import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { User } from "better-auth";

export function GeneratedAvatar({ user }: { user: User }) {
  const avatar = createAvatar(identicon, {
    seed: user.name,
    size: 100,
    radius: 50,
  });
  return <img src={avatar.toDataUri()} alt={user.name} />;
}
