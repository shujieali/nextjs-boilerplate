import { useContext } from "react";
import { AuthActionsContext } from "@/providers/auth/auth-context";

export function useAuthActions() {
  return useContext(AuthActionsContext);
}

export default useAuthActions;
