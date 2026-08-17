const AVATARS = [
  '/icons/avatars/bear.png',
  '/icons/avatars/cat.png',
  '/icons/avatars/meerkat.png',
  '/icons/avatars/panda.png',
];

export const DEFAULT_AVATAR = AVATARS[0];

export function getRandomAvatar(): string {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
