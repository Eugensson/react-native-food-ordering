import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { OrderStatusList } from "@/assets/types";
import { OrderListItem } from "@/components/order-list-item";
import { OrderItemListItem } from "@/components/order-item-list-item";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = (status: string) => {
    updateOrder({ id, updatedFields: { status } });
  };

  if (isLoading) return <ActivityIndicator />;

  if (error || !order) return <Text>Failed to fetch order</Text>;

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen options={{ title: `Order #${order.id}` }} />

        <FlatList
          data={order.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={() => <OrderListItem order={order} />}
          ListFooterComponent={() => (
            <>
              <Text style={{ fontWeight: "bold" }}>Status</Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => updateStatus(status)}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? "white" : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
