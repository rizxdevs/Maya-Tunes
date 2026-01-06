import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertServer } from "@shared/routes";

export function useServers() {
  return useQuery({
    queryKey: [api.servers.list.path],
    queryFn: async () => {
      const res = await fetch(api.servers.list.path);
      if (!res.ok) throw new Error("Failed to fetch servers");
      return api.servers.list.responses[200].parse(await res.json());
    },
  });
}

export function useServer(id: string) {
  return useQuery({
    queryKey: [api.servers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.servers.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch server");
      return api.servers.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useUpdateServer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<InsertServer>) => {
      const url = buildUrl(api.servers.update.path, { id });
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update server");
      return api.servers.update.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.servers.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.servers.get.path, data.id] });
    },
  });
}
