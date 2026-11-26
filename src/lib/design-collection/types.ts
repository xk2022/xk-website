export type DesignStyleId = "modern" | "heritage" | "luxury";
export type DesignStatus = "implemented" | "planned";
export type DesignAvailability = "public" | "planned";
export type DesignPath = `/${string}`;

export type DesignSimplePageKey = "home" | "about" | "services" | "solutions" | "portfolio" | "contact" | "quotation";
export type DesignDetailPageKey = "technical-project" | "brand-showcase";
export type DesignContentPageKey = DesignSimplePageKey | DesignDetailPageKey;
export type DesignPageKey = DesignContentPageKey | "collection";

/** Collection is independent of style; only the two detail destinations take a slug. */
export type DesignRouteRequest = Readonly<{ hash?: string } & (
  | { pageKey: "collection"; styleId?: null; slug?: never }
  | { pageKey: DesignSimplePageKey; styleId: DesignStyleId; slug?: never }
  | { pageKey: DesignDetailPageKey; styleId: DesignStyleId; slug: string }
)>;

export type DesignRouteDescriptor = Readonly<{
  canonicalPath: DesignPath;
  presentationPath: DesignPath;
  availability: DesignAvailability;
  /** Approved fragment without #; path fields never include fragments or query data. */
  hash: string | null;
  /** False for absent, unknown or unsafe fragments; unsupported hashes are dropped. */
  hashPreserved: boolean;
} & (
  | { pageKey: "collection"; styleId: null; slug: null }
  | { pageKey: DesignSimplePageKey; styleId: DesignStyleId; slug: null }
  | { pageKey: DesignDetailPageKey; styleId: DesignStyleId; slug: string }
)>;

export type DesignStyleDefinition = Readonly<{
  id: DesignStyleId;
  name: string;
  status: DesignStatus;
}>;

export type DesignPageDefinition = Readonly<{
  pageKey: DesignContentPageKey;
  /** Modern path; detail routes append a validated registry slug. */
  path: DesignPath;
  kind: "simple" | "detail";
}>;
