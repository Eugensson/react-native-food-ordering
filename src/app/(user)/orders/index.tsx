import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

import { useMyOrderList } from "@/api/orders";
import { OrderListItem } from "@/components/order-list-item";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch orders</Text>;

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
};

export default OrdersScreen;
