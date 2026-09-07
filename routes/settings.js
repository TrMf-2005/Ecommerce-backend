const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");
const requireAdmin = require("../middleware/auth");

// GET /api/settings
// Route publique : renvoie les paramètres actuels (crée un document par défaut s'il n'existe pas encore)
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// PUT /api/settings
// Route protégée : seul l'admin connecté peut modifier le nom de la boutique
router.put("/", requireAdmin, async (req, res) => {
  try {
    const { storeName } = req.body;
    if (!storeName || !storeName.trim()) {
      return res.status(400).json({ message: "Le nom de la boutique ne peut pas être vide" });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    settings.storeName = storeName.trim();
    await settings.save();

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
