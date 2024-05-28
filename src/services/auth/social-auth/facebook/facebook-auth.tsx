"use client";

import { useAuthFacebookLoginService } from "@/services/api/auth";
import { useState } from "react";
import { FullPageLoader } from "@/components/full-page-loader";
import Button from "@mui/material/Button";
import useFacebookAuth from "./use-facebook-auth";
import { useTranslation } from "@/services/i18n/client";

export default function FacebookAuth() {
  const authFacebookLoginService = useAuthFacebookLoginService();
  const facebook = useFacebookAuth();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      const loginResponse = await facebook.login();
      if (!loginResponse.authResponse) return;

      setIsLoading(true);

      await authFacebookLoginService({
        accessToken: loginResponse.authResponse.accessToken,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={onLogin}>
        {t("common:auth.facebook.action")}
      </Button>
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}
