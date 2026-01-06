import { db } from "./db";
import {
  users, servers, musicHistory, botStats,
  type User, type InsertUser,
  type Server, type InsertServer,
  type MusicHistory, type InsertMusicHistory,
  type BotStats
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  // User
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;

  // Server
  getServer(id: string): Promise<Server | undefined>;
  createOrUpdateServer(server: InsertServer): Promise<Server>;
  getServers(): Promise<Server[]>;
  getServersByOwner(ownerId: string): Promise<Server[]>;

  // History
  addHistory(entry: InsertMusicHistory): Promise<MusicHistory>;
  getHistory(guildId: string): Promise<MusicHistory[]>;

  // Stats
  getStats(): Promise<BotStats | undefined>;
  updateStats(stats: { uptime?: string; serverCount?: number; userCount?: number; customStatus?: string }): Promise<BotStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).onConflictDoUpdate({
      target: users.id,
      set: user
    }).returning();
    return newUser;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return updated;
  }

  async getServer(id: string): Promise<Server | undefined> {
    const [server] = await db.select().from(servers).where(eq(servers.id, id));
    return server;
  }

  async createOrUpdateServer(server: InsertServer): Promise<Server> {
    const [saved] = await db.insert(servers).values(server).onConflictDoUpdate({
      target: servers.id,
      set: server
    }).returning();
    return saved;
  }

  async getServers(): Promise<Server[]> {
    return await db.select().from(servers);
  }

  async getServersByOwner(ownerId: string): Promise<Server[]> {
    return await db.select().from(servers).where(eq(servers.ownerId, ownerId));
  }

  async addHistory(entry: InsertMusicHistory): Promise<MusicHistory> {
    const [history] = await db.insert(musicHistory).values(entry).returning();
    return history;
  }

  async getHistory(guildId: string): Promise<MusicHistory[]> {
    return await db.select().from(musicHistory)
      .where(eq(musicHistory.guildId, guildId))
      .orderBy(sql`${musicHistory.playedAt} DESC`)
      .limit(50);
  }

  async getStats(): Promise<BotStats | undefined> {
    const [stats] = await db.select().from(botStats).limit(1);
    return stats;
  }

  async updateStats(stats: { uptime?: string; serverCount?: number; userCount?: number; customStatus?: string }): Promise<BotStats> {
    // Upsert stats (assuming single row for now)
    const existing = await this.getStats();
    if (existing) {
      const [updated] = await db.update(botStats).set(stats).where(eq(botStats.id, existing.id)).returning();
      return updated;
    } else {
      const [newStats] = await db.insert(botStats).values(stats as any).returning();
      return newStats;
    }
  }
}

export const storage = new DatabaseStorage();
