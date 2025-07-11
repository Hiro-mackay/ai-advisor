import { bottts, identicon } from "@dicebear/collection";
import { BackgroundType, createAvatar, Options, Style } from "@dicebear/core";

type Args = {
  style: Style<Options>;
  seed: string;
  backgroundType?: BackgroundType[];
};

export const AVATAR_STYLES = {
  user: identicon,
  agent: bottts,
};

export function generateAvatarUri({
  style,
  seed,
  backgroundType = ["solid"],
}: Args) {
  const avatar = createAvatar(style, {
    seed,
    backgroundType,
  });

  return avatar.toDataUri();
}
