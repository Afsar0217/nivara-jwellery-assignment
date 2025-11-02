import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { priceConfigSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Price Config API Routes
  
  // GET /api/price-config - Retrieve current price configuration
  app.get("/api/price-config", async (_req, res) => {
    try {
      const config = await storage.getPriceConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve price config" });
    }
  });

  // POST /api/price-config - Update price configuration
  app.post("/api/price-config", async (req, res) => {
    try {
      // Validate request body against schema
      const partialConfig = priceConfigSchema.partial().parse(req.body);
      
      // Update price config
      const updatedConfig = await storage.updatePriceConfig(partialConfig);
      res.json(updatedConfig);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid price config data" });
      }
    }
  });

  // GET /api/products - Get all products with dynamic pricing
  app.get("/api/products", async (_req, res) => {
    try {
      const priceConfig = await storage.getPriceConfig();
      res.json({ products: [], priceConfig }); // Products will be calculated on frontend
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
