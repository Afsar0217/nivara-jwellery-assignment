import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Price Config Schema
export const priceConfigSchema = z.object({
  basePrice: z.number().positive(),
  caratMultiplier: z.number().positive(),
  metalPremiums: z.object({
    "white-gold": z.number().min(0),
    "yellow-gold": z.number().min(0),
    "rose-gold": z.number().min(0),
    "platinum": z.number().min(0),
  }),
  customizationFees: z.object({
    engraving: z.number().min(0),
    giftBox: z.number().min(0),
  }),
});

export type PriceConfig = z.infer<typeof priceConfigSchema>;
