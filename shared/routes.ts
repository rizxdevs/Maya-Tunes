import { z } from 'zod';
import { insertServerSchema, servers, musicHistory, botStats } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.any(), // User object
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    }
  },
  servers: {
    list: {
      method: 'GET' as const,
      path: '/api/servers',
      responses: {
        200: z.array(z.custom<typeof servers.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/servers/:id',
      responses: {
        200: z.custom<typeof servers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/servers/:id',
      input: insertServerSchema.partial(),
      responses: {
        200: z.custom<typeof servers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  music: {
    history: {
      method: 'GET' as const,
      path: '/api/servers/:id/history',
      responses: {
        200: z.array(z.custom<typeof musicHistory.$inferSelect>()),
      },
    },
    lyrics: {
      method: 'GET' as const,
      path: '/api/music/lyrics',
      input: z.object({ title: z.string(), artist: z.string().optional() }),
      responses: {
        200: z.object({ lyrics: z.string(), source: z.string() }),
        404: errorSchemas.notFound,
      },
    },
    control: {
      method: 'POST' as const,
      path: '/api/servers/:id/control',
      input: z.object({
        action: z.enum(['play', 'pause', 'stop', 'skip', 'resume']),
        query: z.string().optional(), // for play
      }),
      responses: {
        200: z.object({ message: z.string(), status: z.string() }),
      },
    }
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats',
      responses: {
        200: z.custom<typeof botStats.$inferSelect>(),
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
