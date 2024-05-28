import { useContext } from "react";
import { StoreLanguageContext } from "@/providers/i18n/store-language-context";

function useStoreLanguage() {
  return useContext(StoreLanguageContext);
}

export default useStoreLanguage;
