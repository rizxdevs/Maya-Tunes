import { useRoute, useLocation } from "wouter";
import { useServer } from "@/hooks/use-servers";
import { useMusicHistory } from "@/hooks/use-music";
import { Layout } from "@/components/Layout";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LyricsCard } from "@/components/LyricsCard";
import { Settings, Clock } from "lucide-react";

export default function ServerView() {
  const [match, params] = useRoute("/servers/:id");
  const id = params?.id;
  
  const { data: server, isLoading: serverLoading } = useServer(id!);
  const { data: history } = useMusicHistory(id!);

  // If server data isn't loaded yet or ID is missing
  if (!id || serverLoading) {
    return (
      <Layout>
        <div className="p-10 flex items-center justify-center h-full">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  // Not found handled by router/hook, but just in case
  if (!server) return null;

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold">
                {server.icon ? <img src={server.icon} className="w-full h-full object-cover rounded-xl" /> : server.name.charAt(0)}
             </div>
             <div>
               <h1 className="text-2xl font-display font-bold">{server.name}</h1>
               <p className="text-sm text-muted-foreground">Server Management</p>
             </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Player & History */}
          <div className="lg:col-span-2 space-y-8">
            <MusicPlayer guildId={id} />
            
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-xl">Recently Played</h3>
              </div>
              
              <div className="space-y-4">
                {history && history.length > 0 ? (
                  history.map((track) => (
                    <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground font-mono text-xs">
                        IMG
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist || "Unknown Artist"}</p>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        Just now
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No recent tracks.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Lyrics */}
          <div className="lg:col-span-1">
            {/* Pass current track details here - for now hardcoded placeholder/empty */}
            <LyricsCard title="" />
            
            <div className="mt-8 p-6 rounded-3xl bg-primary/10 border border-primary/20">
              <h4 className="font-bold text-lg mb-2 text-primary">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If the music stops or bot isn't responding, check if Maya has proper permissions in your server.
              </p>
              <button className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                View Documentation &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
