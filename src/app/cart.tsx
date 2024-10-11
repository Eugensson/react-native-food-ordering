import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

import { useCart } from "@/providers/cart-provider";
import { CartListItem } from "@/components/cart-list-item";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
