import { getDesignNavigationModel } from "@/lib/design-collection/navigation-model";
import { StyleSwitcherClient } from "./style-switcher-client";

export function StyleSwitcher() {
  return <StyleSwitcherClient model={getDesignNavigationModel()} />;
}
