import { ActivityIndicator, FlatList, Text } from "react-native";

import { useAdminOrderList } from "@/api/orders";
import { OrderListItem } from "@/components/order-list-item";
import { useInsertOrderSubscription } from "@/api/orders/subscriptions";

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch orders</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrdersScreen;
