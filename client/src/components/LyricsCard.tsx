import { useLyrics } from "@/hooks/use-music";
import { Mic2, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export function LyricsCard({ title, artist, guildId }: { title: string, artist?: string, guildId?: string }) {
  const { data, isLoading } = useLyrics(title, artist);

  if (!title) {
    return (
      <div className="glass-card rounded-3xl p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
          <Mic2 className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground">Play a song in this server to see lyrics</p>
        {guildId && <p className="text-[10px] uppercase tracking-widest text-primary/40">Server Secured: {guildId}</p>}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 h-[400px] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex flex-col">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Mic2 className="w-4 h-4 text-accent" />
            Live Lyrics
          </h3>
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-tighter">Isolated Server Stream</p>
        </div>
        {data?.source && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            via {data.source}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none z-10" />
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
             <div className="h-4 bg-white/5 rounded w-3/4" />
             <div className="h-4 bg-white/5 rounded w-1/2" />
             <div className="h-4 bg-white/5 rounded w-2/3" />
             <div className="h-4 bg-white/5 rounded w-1/3" />
          </div>
        ) : data?.lyrics ? (
          <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-6 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg leading-relaxed whitespace-pre-wrap font-medium text-white/80"
            >
              {data.lyrics}
            </motion.p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No lyrics found for this server's track.
          </div>
        )}
      </div>
    </div>
  );
}
