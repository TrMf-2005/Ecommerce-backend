const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// POST /api/auth/login
// Reçoit { password } et renvoie un token si le mot de passe est correct
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Mot de passe requis" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  // Le mot de passe est correct : on génère un token valable 4 heures
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  res.json({ token });
});

module.exports = router;
