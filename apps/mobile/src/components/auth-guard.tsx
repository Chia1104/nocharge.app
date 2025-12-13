import { Redirect } from "expo-router";

import { authClient } from "@/libs/auth/client";
import type { Session } from "@/libs/auth/client";

interface AuthGuardProps {
  children?: React.ReactNode | ((session: Session) => React.ReactNode);
  fallback?: React.ReactNode;
  disableRedirect?: boolean;
}

export const AuthGuard = ({
  children,
  fallback,
  disableRedirect,
}: AuthGuardProps) => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return fallback || (disableRedirect ? null : <Redirect href="/signin" />);
  }
  return typeof children === "function" ? children(session) : children || null;
};
