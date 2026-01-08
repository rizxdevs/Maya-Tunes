import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_CALLBACK_URL!,
      scope: ["identify", "guilds"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      return done(null, {
        id: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        discriminator: profile.discriminator,
        guilds: profile.guilds,
      });
    }
  )
);

export default passport;
