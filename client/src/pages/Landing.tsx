import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Music, Heart, Shield, ArrowRight, ExternalLink } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export default function Landing() {
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();

  const handleAction = () => {
    if (user) {
      setLocation("/dashboard");
    } else {
      window.location.href = "/api/auth/discord";
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />

      {/* ================= NAVBAR ================= */}
      <nav className="relative z-10 px-6 py-6 max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden glass border border-white/5 shadow-lg shadow-primary/20">
            <img
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png"
              alt="Maya Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">
            Maya
          </span>
        </div>

        {/* Auth section */}
        {!isLoading && (
          <>
            {!user ? (
              <Button
                variant="outline"
                className="rounded-full border-white/10 hover:bg-white/5 hover:text-white"
                onClick={() => (window.location.href = "/api/auth/discord")}
              >
                Login with Discord
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={
                      user.avatar
                        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                        : "https://cdn.discordapp.com/embed/avatars/0.png"
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Username */}
                <span className="text-sm font-medium">
                  {user.username}
                </span>

                {/* Logout */}
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/10 hover:bg-red-500/10 hover:text-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl mb-8">
            <img
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png"
              alt="Maya"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary-foreground/80">
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>Spreading comfort through sound</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            Playing feelings, <br className="hidden sm:block" />
            <span className="text-gradient">not just songs.</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Maya is a gentle little music bot created to bring comfort through sound 🥹🎶.
            Inspired by Sarva Maya, she believes music is not just something you hear, but something you feel.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 px-6">
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20"
              onClick={handleAction}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg bg-white/10 hover:bg-white/20 text-white border border-white/10"
              onClick={() =>
                window.open(
                  "https://discord.com/api/oauth2/authorize?client_id=1325752101569433600&permissions=8&scope=bot%20applications.commands",
                  "_blank",
                )
              }
            >
              Invite Maya <ExternalLink className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 text-lg border-white/10 hover:bg-white/5 text-white"
              onClick={() =>
                window.open("https://discord.gg/wQ3jUthtaR", "_blank")
              }
            >
              <SiDiscord className="w-5 h-5 mr-2" />
              Support Server
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center px-6">
        <p className="text-sm text-muted-foreground">
          © 2024 Maya Music Bot. Crafted with 💜 by Maya Developers.
        </p>
      </footer>
    </div>
  );
}
