import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { PizzaSize } from "@/assets/types";
import { useProduct } from "@/api/products";
import { Button } from "@/components/button";
import { useCart } from "@/providers/cart-provider";
import { defaultPizzaImage } from "@/constants/images";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch product</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>$ {product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 10,
  },
  image: {
    marginHorizontal: "auto",
    width: 300,
    aspectRatio: 1,
  },
  sizes: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    marginTop: "auto",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ProductDetailsScreen;
