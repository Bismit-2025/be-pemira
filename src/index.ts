import { Hono } from "hono";
import type { PrismaClient } from "./generated/prisma/client";
import { swaggerUI, SwaggerUI } from "@hono/swagger-ui";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

// A basic OpenAPI document
const openApiDoc = {
  openapi: "3.0.0", // This is the required version field
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for your service",
  },
  paths: {
    // Add your API paths here
    "/": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK",
          },
        },
      },
    },
    // Add more endpoints as needed
  },
};

const app = new Hono<ContextWithPrisma>();

app.get("/doc", (c) => c.json(openApiDoc));

app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
