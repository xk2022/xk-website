export type ContactChannel = {
  label: string;
  href: `mailto:${string}` | `https://${string}`;
};

/** Publish only channels explicitly confirmed for public business enquiries. */
// The owner supplied this public enquiry address in the current instruction.
// A mailto link opens the visitor's mail client; it is not delivery evidence.
export const verifiedContactChannels: readonly ContactChannel[] = [
  { label: "Email 專案詢價", href: "mailto:system.xk2022@gmail.com" },
];
