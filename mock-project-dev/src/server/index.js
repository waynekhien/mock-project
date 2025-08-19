// server/index.js
import "dotenv/config"; // nạp biến .env (hoặc dùng dotenv.config())
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
// đổi nếu FE dùng origin khác

// ✅ Dùng biến riêng cho server, không dùng VITE_
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

if (!GOOGLE_CLIENT_ID) {
  console.error("Missing GOOGLE_CLIENT_ID in server .env");
  process.exit(1);
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.get("/health", (_, res) => res.send("ok"));

app.post("/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).json({ message: "Missing credential" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload?.email) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const user = { id: payload.sub, email: payload.email, name: payload.name };
    const accessToken = jwt.sign({ uid: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ accessToken, user });
  } catch (e) {
    console.error("auth/google error:", e?.message || e);
    res.status(500).json({ message: "Google auth failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
