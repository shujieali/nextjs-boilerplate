"use client";

import { useAuthGoogleLoginService } from "@/services/api/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FullPageLoader } from "@/components/full-page-loader";
import useLanguage from "@/services/i18n/use-language";

export default function GoogleAuth() {
  const authGoogleLoginService = useAuthGoogleLoginService();
  const language = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);

    await authGoogleLoginService({
      idToken: tokenResponse.credential,
    });
    setIsLoading(false);
  };

  return (
    <>
      <GoogleLogin onSuccess={onSuccess} locale={language} />
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}
