import { useRoute, Link, useLocation } from "wouter";
import { useServer } from "@/hooks/use-servers";
import { useMusicHistory } from "@/hooks/use-music";
import { Layout } from "@/components/Layout";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LyricsCard } from "@/components/LyricsCard";
import { Settings, Clock, Activity, Music, ArrowLeft } from "lucide-react";

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
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group mb-2">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold">
                {server.icon ? <img src={server.icon} className="w-full h-full object-cover rounded-xl" /> : server.name.charAt(0)}
             </div>
             <div>
               <h1 className="text-2xl md:text-3xl font-display font-bold">{server.name}</h1>
               <p className="text-sm text-muted-foreground">Server Management & Music Control</p>
             </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Status Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {[
            { label: "Uptime", value: "Bot is Online", icon: Activity, color: "text-green-400" },
            { label: "Status", value: "Playing Feelings", icon: Music, color: "text-primary" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xs md:text-sm font-bold font-mono truncate max-w-[80px] md:max-w-none">{stat.value}</p>
              </div>
            </div>
          ))}
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

          {/* Right Column: Live Lyrics */}
          <div className="lg:col-span-1 space-y-8">
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </div>
              <LyricsCard title="Lofi Beats to Relax To" guildId={id} />
            </div>
            
            <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20">
              <h4 className="font-bold text-lg mb-2 text-primary">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Join our support server if you have any questions or need help with Maya.
              </p>
              <button 
                onClick={() => window.open("https://discord.gg/corebyte", "_blank")}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                Join CoreByte Discord &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
