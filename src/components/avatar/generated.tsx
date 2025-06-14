import { identicon } from "@dicebear/collection";
import { createAvatar, Options, Style } from "@dicebear/core";

type Props = {
  seed: string;
  size?: number;
  radius?: number;
  style?: Style<Options>;
};

export function GeneratedAvatar({
  seed,
  size = 100,
  radius,
  style = identicon,
}: Props) {
  const avatar = createAvatar(style, {
    seed,
    size,
    radius: radius ?? size / 2,
  });
  return <img src={avatar.toDataUri()} alt={seed} />;
}
