import QueryClientProvider from "./react-query/query-client-provider";
import ReactQueryDevtools from "./react-query/react-query-devtools";
import queryClient from "./react-query/query-client";

import ThemeProvider from "./theme/theme-provider";
import CssBaseline from "@mui/material/CssBaseline";

import StoreLanguageProvider from "./i18n/store-language-provider";

import AuthProvider from "./auth/auth-provider";

import LeavePageProvider from "./leave-page/leave-page-provider";

import SnackbarProvider from "./snackbar";

import ConfirmDialogProvider from "./confirm-dialog/confirm-dialog-provider";

export default function CombinedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <StoreLanguageProvider>
            <ConfirmDialogProvider>
              <AuthProvider>
                <LeavePageProvider>{children}</LeavePageProvider>
              </AuthProvider>
            </ConfirmDialogProvider>
          </StoreLanguageProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
