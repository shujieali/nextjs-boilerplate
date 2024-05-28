"use client";

import { useTranslation } from "@/services/i18n";
import { delay } from "@/utils";
import React from "react";
import useSnackbar from "@/hooks/snackbar";
import { useAuth } from "@/services/auth";

export default function Home() {
  const { t } = useTranslation("page");
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  delay(0);
  return (
    <div>
      <h1>{t("title")}</h1>
      <button
        onClick={() => {
          enqueueSnackbar("Hello, world!");
        }}
      >
        Show snackbar
      </button>
      {user ? <p>welcome {user.firstName}</p> : null}
    </div>
  );
}
