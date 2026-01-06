# Maya Music Bot Dashboard

## Overview
A modern dashboard for the Maya Music Bot, featuring server management, music controls, lyrics display, and statistics.

## Features
- **Landing Page**: "About Maya" and "About Owner" sections with specific branding.
- **Dashboard**: Server list and bot status.
- **Server View**: Music player controls (Play, Pause, Skip, Stop), Lyrics display, and Music History.
- **Mock Mode**: Currently runs with mock data for demonstration purposes (since Discord integration was skipped).

## Architecture
- **Frontend**: React + Vite + Shadcn UI + Tailwind CSS.
- **Backend**: Express + Drizzle ORM + PostgreSQL (Neon).
- **Database**: Stores users, servers, music history, and bot stats.

## Setup
- **Database**: PostgreSQL (Provisioned).
- **Environment Variables**:
  - `DATABASE_URL`: Connection string.
  - `SESSION_SECRET`: Session management.

## Future Steps
- Add real Discord Bot Token and Client ID to `.env`.
- Integrate with a Lavalink node for real music playback.
