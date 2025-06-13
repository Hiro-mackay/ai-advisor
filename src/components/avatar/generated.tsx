import { identicon } from "@dicebear/collection";
import { createAvatar, Options, Style } from "@dicebear/core";
import { User } from "better-auth";

type Props = {
  user: User;
  size?: number;
  radius?: number;
  style?: Style<Options>;
};

export function GeneratedAvatar({
  user,
  size = 100,
  radius = 50,
  style = identicon,
}: Props) {
  const avatar = createAvatar(style, {
    seed: user.name,
    size,
    radius,
  });
  return <img src={avatar.toDataUri()} alt={user.name} />;
}
