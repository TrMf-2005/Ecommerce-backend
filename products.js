const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const requireAdmin = require("../middleware/auth");

// GET /api/products
// Route publique : tout le monde peut voir la liste des produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// POST /api/products
// Route protégée : seul l'admin connecté peut ajouter un produit
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    const product = new Product({ name, price, description, category, image });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// DELETE /api/products/:id
// Route protégée : seul l'admin connecté peut supprimer un produit
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
