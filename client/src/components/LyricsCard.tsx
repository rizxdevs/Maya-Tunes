import { useLyrics } from "@/hooks/use-music";
import { Mic2, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export function LyricsCard({ title, artist }: { title: string, artist?: string }) {
  const { data, isLoading } = useLyrics(title, artist);

  if (!title) {
    return (
      <div className="glass-card rounded-3xl p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
          <Mic2 className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground">Play a song to see lyrics</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 h-[400px] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          <Mic2 className="w-4 h-4 text-accent" />
          Lyrics
        </h3>
        {data?.source && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            via {data.source}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
             <div className="h-4 bg-white/5 rounded w-3/4" />
             <div className="h-4 bg-white/5 rounded w-1/2" />
             <div className="h-4 bg-white/5 rounded w-2/3" />
             <div className="h-4 bg-white/5 rounded w-1/3" />
          </div>
        ) : data?.lyrics ? (
          <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-6 text-center">
            <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium text-white/80">
              {data.lyrics}
            </p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No lyrics found for this track.
          </div>
        )}
      </div>
    </div>
  );
}
