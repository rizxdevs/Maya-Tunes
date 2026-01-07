import { useServers } from "@/hooks/use-servers";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

export default function ServerList() {
  const { data: servers, isLoading } = useServers();

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">My Servers</h1>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-white/5">
            <Plus className="w-4 h-4" /> Add Server
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-card/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers?.map((server, i) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={`/servers/${server.id}`}
                  className="group block glass-card p-6 rounded-2xl relative overflow-hidden h-full border border-white/5 hover:border-primary/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex-shrink-0 overflow-hidden">
                      {server.icon ? (
                        <img src={server.icon} alt={server.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-xl text-muted-foreground bg-white/5">
                          {server.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg truncate pr-4">{server.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${server.isBotIn ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {server.isBotIn ? 'Active' : 'Invite Needed'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto relative z-10">
                    <span className="text-sm text-muted-foreground font-mono">Slash Commands Only</span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
