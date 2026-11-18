export type ContactChannel = {
  label: string;
  href: `mailto:${string}` | `https://${string}`;
};

/** Publish only channels explicitly confirmed for public business enquiries. */
export const verifiedContactChannels: readonly ContactChannel[] = [];
