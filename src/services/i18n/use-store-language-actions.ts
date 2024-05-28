import { useContext } from "react";
import { StoreLanguageActionsContext } from "@/providers/i18n/store-language-context";

function useStoreLanguageActions() {
  return useContext(StoreLanguageActionsContext);
}

export default useStoreLanguageActions;
