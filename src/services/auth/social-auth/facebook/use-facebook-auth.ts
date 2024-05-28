"use client";

import { useContext } from "react";
import { FacebookContext } from "@/providers/auth/social-auth/facebook/facebook-context";

export default function useFacebookAuth() {
  return useContext(FacebookContext);
}
