import { type User, type InsertUser, type PriceConfig } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPriceConfig(): Promise<PriceConfig>;
  updatePriceConfig(config: Partial<PriceConfig>): Promise<PriceConfig>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private priceConfig: PriceConfig;

  constructor() {
    this.users = new Map();
    // Default price config
    this.priceConfig = {
      basePrice: 50000,
      caratMultiplier: 45000,
      metalPremiums: {
        "white-gold": 0,
        "yellow-gold": 2000,
        "rose-gold": 2500,
        "platinum": 15000,
      },
      customizationFees: {
        engraving: 3000,
        giftBox: 2500,
      },
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPriceConfig(): Promise<PriceConfig> {
    return this.priceConfig;
  }

  async updatePriceConfig(config: Partial<PriceConfig>): Promise<PriceConfig> {
    this.priceConfig = {
      ...this.priceConfig,
      ...config,
      metalPremiums: {
        ...this.priceConfig.metalPremiums,
        ...(config.metalPremiums || {}),
      },
      customizationFees: {
        ...this.priceConfig.customizationFees,
        ...(config.customizationFees || {}),
      },
    };
    return this.priceConfig;
  }
}

export const storage = new MemStorage();
