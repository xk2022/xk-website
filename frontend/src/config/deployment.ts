/** The approved GitHub Pages custom domain serves the website at its root. */
export const pagesDeployment = {
  origin: "https://www.xplorekaleidoscope.com",
  basePath: "",
} as const;

export function assertPagesBasePath(value: string | undefined): void {
  if (value !== undefined && value !== pagesDeployment.basePath) {
    throw new Error("Custom-domain Pages builds require an empty XK_PAGES_BASE_PATH; repository paths and URLs are invalid.");
  }
}
