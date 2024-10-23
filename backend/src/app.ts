import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from the Express TypeScript backend!");
});

export default app;
