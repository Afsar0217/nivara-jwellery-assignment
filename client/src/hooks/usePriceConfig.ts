import { useQuery } from "@tanstack/react-query";
import type { PriceConfig } from "@shared/schema";

export function usePriceConfig() {
  return useQuery<PriceConfig>({
    queryKey: ["/api/price-config"],
    queryFn: async () => {
      const res = await fetch("/api/price-config", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch price config");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

