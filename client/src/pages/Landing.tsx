import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Music, Heart, Shield, ArrowRight, ExternalLink } from "lucide-react";

export default function Landing() {
  const { data: user } = useUser();
  const [, setLocation] = useLocation();

  const handleAction = () => {
    if (user) {
      setLocation("/dashboard");
    } else {
      window.location.href = "/api/auth/discord"; 
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Abstract Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />

      {/* Navbar */}
      <nav className="relative z-10 px-6 py-6 max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden glass border border-white/5 shadow-lg shadow-primary/20">
            <img 
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png?ex=695e0ed7&is=695cbd57&hm=0cbdb5f5345cf02893c6ea2991f103c531db1f761cffe552c38edac616aed0dc&" 
              alt="Maya"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">Maya</span>
        </div>
        <Button 
          variant="outline" 
          className="rounded-full border-white/10 hover:bg-white/5 hover:text-white"
          onClick={() => window.location.href = "/api/auth/discord"}
        >
          Login with Discord
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl mb-8">
            <img 
              src="https://cdn.discordapp.com/attachments/1431965943461974227/1458003252468650096/94014ACD-A864-4B64-8D71-9654E35A1340.png?ex=695e0ed7&is=695cbd57&hm=0cbdb5f5345cf02893c6ea2991f103c531db1f761cffe552c38edac616aed0dc&" 
              alt="Maya"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary-foreground/80 mb-4">
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 px-6 w-full max-w-lg mx-auto sm:max-w-none">
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-full px-8 h-14 text-lg bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
              onClick={handleAction}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 h-14 text-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2"
              onClick={() => window.open("https://discord.com/api/oauth2/authorize?client_id=1325752101569433600&permissions=8&scope=bot%20applications.commands", "_blank")}
            >
              Invite Maya <ExternalLink className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-full px-8 h-14 text-lg border-white/10 hover:bg-white/5 text-white"
              onClick={() => window.open("https://discord.gg/dsWzQSGyEp", "_blank")}
            >
              Support Server
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-24 bg-card/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">About Maya</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Every song Maya plays is meant to calm hearts, lift moods, and make no one feel alone 💖.
                </p>
                <p>
                  With high-quality audio streaming, intuitive controls, and a dashboard that puts you in control, Maya brings a premium yet comforting music experience to your community.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass p-4 rounded-2xl">
                  <h4 className="font-bold text-xl mb-1 text-primary">High Quality</h4>
                  <p className="text-sm text-muted-foreground">Crystal clear audio with low latency</p>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <h4 className="font-bold text-xl mb-1 text-accent">99.9% Uptime</h4>
                  <p className="text-sm text-muted-foreground">Always there when you need comfort</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-[2.5rem] relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-display font-bold mb-4">About Maya Developers</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Maya Music Bot is thoughtfully created and maintained by the Maya Developers team, a dedicated group of creators with a deep appreciation for music and user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a balance of creativity and care, our team designed Maya to be both powerful and comforting, blending clean technology with gentle vibes. Our vision is simple yet meaningful: to make music feel personal, warm, and welcoming for everyone 🎧🌙
              </p>
            </motion.div>
          </div>

          {/* Partner Hosting Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-primary/5 to-accent/5 border border-white/5"
          >
            <h3 className="text-2xl font-bold mb-4">Our Trusted Hosting Partner</h3>
            <p className="text-muted-foreground leading-relaxed">
              Maya Bot is hosted on high-performance infrastructure powered by CoreByte Hostings, ensuring stable and low-latency operation for real-time music streaming and command handling. The bot runs on servers equipped with AMD EPYC processors, DDR5 memory, and NVMe SSD storage, enabling fast event processing, efficient queue handling, and smooth audio playback under high concurrency. With optimized networking across India and Singapore regions, Maya Bot benefits from reduced latency and consistent voice connections. The environment is secured with always-on DDoS protection and continuous monitoring, providing reliable uptime and production-grade stability for large Discord communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Maya Music Bot. Crafted with 💜 by Maya Developers.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">
            Powering feelings, one song at a time • Hosted with care by our partner
          </p>
        </div>
      </footer>
    </div>
  );
}
