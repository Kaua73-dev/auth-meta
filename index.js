import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dash.js";
import "dotenv/config";

const app = express();

// obrigatório para OAuth
app.use(session({
  secret: "teste",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// 🔥 REGISTRA TODAS AS ROTAS
authRoutes(app);
dashRoutes(app);

app.listen(3000, () => {
  console.log("🔥 Rodando em http://localhost:3000");
});
