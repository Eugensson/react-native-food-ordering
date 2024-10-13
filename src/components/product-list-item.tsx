import { Link, useSegments } from "expo-router";
import { StyleSheet, Text, Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { Tables } from "@/assets/types";
import { defaultPizzaImage } from "@/constants/images";
import { RemoteImage } from "@/components/remote-image";

type ProductListItemProps = {
  product: Tables<"products">;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          fallback={defaultPizzaImage}
          path={product.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>$ {product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "700",
  },
});
