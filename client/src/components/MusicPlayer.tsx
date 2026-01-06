import { Play, Pause, SkipForward, Square, Music } from "lucide-react";
import { useMusicControl } from "@/hooks/use-music";
import { useState } from "react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  guildId: string;
}

export function MusicPlayer({ guildId }: MusicPlayerProps) {
  const { mutate: control, isPending } = useMusicControl();
  const [isPlaying, setIsPlaying] = useState(false); // Optimistic state for demo
  const [query, setQuery] = useState("");

  const handlePlay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    control({ guildId, action: 'play', query });
    setIsPlaying(true);
    setQuery("");
  };

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <h3 className="font-display font-bold text-xl flex items-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          Now Playing
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground uppercase">Live</span>
        </div>
      </div>

      {/* Track Info Placeholder */}
      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="w-full md:w-32 h-32 rounded-2xl bg-secondary/50 flex items-center justify-center shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          <Music className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <div className="text-center md:text-left flex-1 space-y-2">
          <div className="h-6 w-3/4 bg-white/5 rounded-md mx-auto md:mx-0 animate-pulse" />
          <div className="h-4 w-1/2 bg-white/5 rounded-md mx-auto md:mx-0 animate-pulse" />
        </div>
      </div>

      {/* Progress Bar Placeholder */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden relative z-10">
        <div className="w-1/3 h-full bg-gradient-to-r from-primary to-accent" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 relative z-10">
        <button 
          onClick={() => control({ guildId, action: 'stop' })}
          disabled={isPending}
          className="p-3 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
        >
          <Square className="w-5 h-5 fill-current" />
        </button>
        
        <button 
          onClick={() => {
            control({ guildId, action: isPlaying ? 'pause' : 'resume' });
            setIsPlaying(!isPlaying);
          }}
          disabled={isPending}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>

        <button 
          onClick={() => control({ guildId, action: 'skip' })}
          disabled={isPending}
          className="p-3 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
        >
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>

      {/* Search/Play Input */}
      <form onSubmit={handlePlay} className="relative z-10 mt-4">
        <input
          type="text"
          placeholder="Paste URL or search song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-secondary/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
        />
      </form>
    </div>
  );
}
