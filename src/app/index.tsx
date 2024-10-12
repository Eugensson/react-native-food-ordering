import { Link, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/button";
import { useAuth } from "@/providers/auth-provider";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) return <ActivityIndicator />;

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default index;
