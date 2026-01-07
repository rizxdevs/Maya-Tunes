import { useUser } from "@/hooks/use-auth";
import { useBotStats } from "@/hooks/use-stats";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Server, Activity, Users, Radio, ExternalLink, Music } from "lucide-react";

export default function Dashboard() {
  const { data: user } = useUser();
  const { data: stats } = useBotStats();

  if (!user) return null;

  const statCards = [
    { label: "Total Servers", value: stats?.serverCount || "...", icon: Server, color: "text-primary" },
    { label: "Users Listening", value: stats?.userCount || "...", icon: Users, color: "text-accent" },
    { label: "Uptime", value: "Bot is Online", icon: Activity, color: "text-green-400" },
    { label: "System Status", value: "Healthy", icon: Radio, color: "text-blue-400" },
  ];

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome Maya Management 👋
            </h1>
            <p className="text-muted-foreground">Manage your servers and music playback.</p>
          </div>
          <a 
            href="#" 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            Invite Maya <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 sm:p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold font-mono mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions / Recent Activity Area (Placeholder) */}
        {/* Bot Commands Guide */}
        <div className="glass-card p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Maya Command Guide</h3>
              <p className="text-sm text-muted-foreground">Master the feelings of music</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { cmd: "/play", desc: "Plays your favorite songs with gentle vibes" },
              { cmd: "/stop", desc: "Gracefully stops the music and clears queue" },
              { cmd: "/pause", desc: "Pauses the current melody" },
              { cmd: "/resume", desc: "Continues the musical journey" },
              { cmd: "/skip", desc: "Moves to the next feeling in queue" },
              { cmd: "/history", desc: "Shows your past musical comfort" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <p className="font-mono text-primary font-bold mb-1">{item.cmd}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-6 rounded-2xl min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
               <Radio className="w-8 h-8 text-primary" />
             </div>
             <div>
               <h3 className="font-bold text-xl">Ready for Music</h3>
               <p className="text-muted-foreground mt-2 max-w-md">
                 Maya is currently idle and ready to bring comfort to your voice channels. 
                 Select a server to start playing feelings, not just songs.
               </p>
             </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-accent fill-accent/20" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Support Maya</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your support helps keep Maya playing 24/7 with high quality audio.
              </p>
            </div>
            <button className="w-full py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              Donate
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper icon
function Heart(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
