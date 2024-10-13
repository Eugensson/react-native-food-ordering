import { useMutation } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/assets/types";

export const useInsertOrderItems = () =>
  useMutation({
    mutationFn: async (items: InsertTables<"order_items">[]) => {
      const { data: newOrder, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) throw new Error(error.message);

      return newOrder;
    },
  });
