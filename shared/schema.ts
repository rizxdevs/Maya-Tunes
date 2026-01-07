import { pgTable, text, varchar, serial, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Discord ID
  username: text("username").notNull(),
  discriminator: text("discriminator").notNull(),
  avatar: text("avatar"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const servers = pgTable("servers", {
  id: text("id").primaryKey(), // Guild ID
  name: text("name").notNull(),
  icon: text("icon"),
  ownerId: text("owner_id").notNull(),
  isBotIn: boolean("is_bot_in").default(false),
});

export const musicHistory = pgTable("music_history", {
  id: serial("id").primaryKey(),
  guildId: text("guild_id").notNull(), // Link to servers.id
  title: text("title").notNull(),
  artist: text("artist"),
  url: text("url"),
  requesterId: text("requester_id"), // Link to users.id
  playedAt: timestamp("played_at").defaultNow(),
});

export const botStats = pgTable("bot_stats", {
  id: serial("id").primaryKey(),
  uptime: text("uptime"),
  serverCount: integer("server_count"),
  userCount: integer("user_count"),
  customStatus: text("custom_status").default("Listening to your feelings 🎶"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users);
export const insertServerSchema = createInsertSchema(servers);
export const insertHistorySchema = createInsertSchema(musicHistory).omit({ id: true, playedAt: true });
export const insertStatsSchema = createInsertSchema(botStats).omit({ id: true, lastUpdated: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Server = typeof servers.$inferSelect;
export type InsertServer = z.infer<typeof insertServerSchema>;

export type MusicHistory = typeof musicHistory.$inferSelect;
export type InsertMusicHistory = z.infer<typeof insertHistorySchema>;

export type BotStats = typeof botStats.$inferSelect;

// === API CONTRACT TYPES ===

export type UserResponse = User;
export type ServerResponse = Server & { botInGuild: boolean };
export type HistoryResponse = MusicHistory;
export type StatsResponse = BotStats;

export interface LyricsResponse {
  lyrics: string;
  source: string;
}

export interface PlayerStatus {
  guildId: string;
  isPlaying: boolean;
  currentTrack: {
    title: string;
    author: string;
    duration: number;
    position: number;
    thumbnail?: string;
  } | null;
}
