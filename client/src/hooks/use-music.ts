import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMusicHistory(guildId: string) {
  return useQuery({
    queryKey: [api.music.history.path, guildId],
    queryFn: async () => {
      const url = buildUrl(api.music.history.path, { id: guildId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.music.history.responses[200].parse(await res.json());
    },
    enabled: !!guildId,
  });
}

export function useLyrics(title: string, artist?: string) {
  return useQuery({
    queryKey: [api.music.lyrics.path, title, artist],
    queryFn: async () => {
      // Pass params in query string since it's a GET request
      const params = new URLSearchParams({ title });
      if (artist) params.append("artist", artist);
      
      const res = await fetch(`${api.music.lyrics.path}?${params.toString()}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch lyrics");
      return api.music.lyrics.responses[200].parse(await res.json());
    },
    enabled: !!title,
  });
}

export function useMusicControl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ guildId, action, query }: { guildId: string, action: 'play' | 'pause' | 'stop' | 'skip' | 'resume', query?: string }) => {
      const url = buildUrl(api.music.control.path, { id: guildId });
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, query }),
      });
      if (!res.ok) throw new Error("Failed to control music");
      return api.music.control.responses[200].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      // Invalidate history if we played something new
      if (variables.action === 'play') {
        queryClient.invalidateQueries({ queryKey: [api.music.history.path, variables.guildId] });
      }
    },
  });
}
