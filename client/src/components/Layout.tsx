import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { LogOut, Music, Server, LayoutDashboard } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [location] = useLocation();

  if (!user) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location === path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5";

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-white/5 flex flex-col p-6 sticky top-0 h-auto md:h-screen z-40">
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Maya</span>
          </div>
          <div className="w-full aspect-square rounded-2xl overflow-hidden glass border border-white/5">
            <img 
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png?ex=695e0ed7&is=695cbd57&hm=0cbdb5f5345cf02893c6ea2991f103c531db1f761cffe552c38edac616aed0dc&" 
              alt="Maya"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/servers" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/servers')}`}>
            <Server className="w-5 h-5" />
            My Servers
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
               {user.avatar ? (
                 <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">
                   {user.username.charAt(0).toUpperCase()}
                 </div>
               )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.username}</p>
              <p className="text-xs text-muted-foreground">#{user.discriminator}</p>
            </div>
          </div>
          <button 
            onClick={() => logout()} 
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
