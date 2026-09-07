require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const settingsRoutes = require("./routes/settings");

const app = express();

// Middlewares
app.use(cors()); // autorise le frontend (Vercel) à appeler ce backend
// Limite augmentée à 10mb car les images en base64 peuvent être volumineuses
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);

// Route de test pour vérifier que le serveur tourne
app.get("/", (req, res) => {
  res.send("API e-commerce en ligne ✅");
});

// Connexion à MongoDB Atlas puis démarrage du serveur
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err.message);
  });
