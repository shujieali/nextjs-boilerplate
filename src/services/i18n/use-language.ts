"use client";

import { useParams } from "next/navigation";
import { fallbackLanguage } from "@/providers/i18n/config";

function useLanguage() {
  const params = useParams();

  return (
    (Array.isArray(params?.language)
      ? params?.language[0]
      : params?.language) || fallbackLanguage
  );
}

export default useLanguage;
