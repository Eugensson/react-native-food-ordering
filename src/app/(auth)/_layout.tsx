import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/providers/auth-provider";

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
};

export default AuthLayout;
