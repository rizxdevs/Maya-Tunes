import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { LogOut, Music, Server, LayoutDashboard, ExternalLink } from "lucide-react";

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
      <aside className="w-full md:w-64 glass border-r border-white/5 flex flex-col p-4 md:p-6 sticky top-0 h-auto md:h-screen z-40">
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start mb-4 md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Music className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight">Maya</span>
          </div>
          <div className="hidden md:block w-full aspect-square rounded-full overflow-hidden glass border border-white/5">
            <img 
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png?ex=695e0ed7&is=695cbd57&hm=0cbdb5f5345cf02893c6ea2991f103c531db1f761cffe552c38edac616aed0dc&" 
              alt="Maya"
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => window.location.href = "/api/auth/discord"}
            className="md:w-full py-1.5 md:py-2 px-3 md:px-4 rounded-lg md:rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-[10px] md:text-sm font-bold flex items-center justify-center gap-2 transition-all hover-elevate active-elevate-2 shadow-lg shadow-[#5865F2]/20"
          >
            <Music className="w-3 h-3 md:w-4 md:h-4 fill-white" />
            <span className="hidden sm:inline">Login to Discord</span>
            <span className="sm:hidden">Login</span>
          </button>
        </div>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-scrollbar">
          <Link href="/dashboard" className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all text-sm md:font-medium ${isActive('/dashboard')}`}>
            <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
            Dashboard
          </Link>
          <Link href="/servers" className={`flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all text-sm md:font-medium ${isActive('/servers')}`}>
            <Server className="w-4 h-4 md:w-5 md:h-5" />
            My Servers
          </Link>
          <a 
            href="https://discord.com/api/oauth2/authorize?client_id=1325752101569433600&permissions=8&scope=bot%20applications.commands" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all text-sm md:font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            Invite Maya
          </a>
        </nav>

        <div className="hidden md:block mt-auto pt-6 border-t border-white/5">
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
