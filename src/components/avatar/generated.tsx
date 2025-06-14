import { identicon } from "@dicebear/collection";
import { BackgroundType, createAvatar, Options, Style } from "@dicebear/core";

type Props = {
  seed: string;
  size?: number;
  radius?: number;
  backgroundType?: BackgroundType[];
  style?: Style<Options>;
};

export function GeneratedAvatar({
  seed,
  size = 100,
  radius,
  backgroundType = ["solid"],
  style = identicon,
}: Props) {
  const avatar = createAvatar(style, {
    seed,
    size,
    radius: radius ?? size / 2,
    backgroundType,
  });
  return <img src={avatar.toDataUri()} alt={seed} />;
}
