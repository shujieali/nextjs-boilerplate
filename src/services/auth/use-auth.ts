import { useContext } from "react";
import { AuthContext } from "@/providers/auth/auth-context";

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
