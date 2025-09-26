import express from "express";

const app = express();
app.use(express.json());

// Example API route
app.get("/api/health", (_req, res) => {
	res.json({ ok: true });
});

export default app;


