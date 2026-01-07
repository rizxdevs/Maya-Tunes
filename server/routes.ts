import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Session Setup (Mock for now, real Discord Auth would go here)
  app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({ checkPeriod: 86400000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'dev-secret',
  }));

  // === Mock Auth Routes ===
  // In a real app, this would use passport-discord
  app.get('/api/auth/me', (req, res) => {
    // Mock user for MVP since no Discord Creds provided
    // In production, check req.user
    res.json({
      id: "123456789",
      username: "MayaFan",
      discriminator: "0001",
      avatar: null
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  // === Server Routes ===
  app.get(api.servers.list.path, async (req, res) => {
    // In reality, filter by user's guilds
    // Seed some data if empty
    let servers = await storage.getServers();
    if (servers.length === 0) {
        await seedData();
        servers = await storage.getServers();
    }
    res.json(servers);
  });

  app.get(api.servers.get.path, async (req, res) => {
    const server = await storage.getServer(req.params.id);
    if (!server) return res.status(404).json({ message: "Server not found" });
    res.json(server);
  });

  app.patch(api.servers.update.path, async (req, res) => {
    try {
      const input = api.servers.update.input.parse(req.body);
      const updated = await storage.createOrUpdateServer({ ...input, id: req.params.id } as any);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // === Music Routes ===
  app.get(api.music.history.path, async (req, res) => {
    const history = await storage.getHistory(req.params.id);
    res.json(history);
  });

  app.get(api.music.lyrics.path, async (req, res) => {
    // Mock Lyrics API
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: "Title required" });
    
    // Simple mock response
    res.json({
      lyrics: `[Verse 1]\nLyrics for ${title} would appear here...\n(Real lyrics require an external API like Genius)`,
      source: "Genius (Mock)"
    });
  });

  app.post(api.music.control.path, async (req, res) => {
    const { action, query } = req.body;
    // Here we would interface with the Lavalink node or Discord Bot
    // For now, we simulate success
    res.json({ message: `Action ${action} executed successfully`, status: "success" });
  });

  // === Stats Route ===
  app.get(api.stats.get.path, async (req, res) => {
    let stats = await storage.getStats();
    if (!stats) {
      stats = await storage.updateStats({
        uptime: "2d 4h 12m",
        serverCount: 150,
        userCount: 4500,
        customStatus: "Maya — playing feelings, not just songs"
      });
    }
    res.json(stats);
  });

  app.patch('/api/stats', async (req, res) => {
    // Owner only check would go here
    const stats = await storage.updateStats(req.body);
    res.json(stats);
  });

  return httpServer;
}

async function seedData() {
    await storage.createOrUpdateServer({
        id: "1",
        name: "Maya's Lounge",
        ownerId: "123456789",
        isBotIn: true
    });
    await storage.createOrUpdateServer({
        id: "2",
        name: "Test Server",
        ownerId: "123456789",
        isBotIn: false
    });
    await storage.addHistory({
        guildId: "1",
        title: "Lofi Beats to Relax To",
        artist: "Lofi Girl",
        url: "https://youtube.com/watch?v=...",
        requesterId: "123456789"
    });
}
