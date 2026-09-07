const jwt = require("jsonwebtoken");

// Ce middleware protège les routes réservées à l'admin.
// Il vérifie qu'un token JWT valide est présent dans l'en-tête Authorization.
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization; // format attendu : "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // on pourrait y stocker des infos si besoin
    next();
  } catch (err) {
    return res.status(401).json({ message: "Accès refusé : token invalide ou expiré" });
  }
}

module.exports = requireAdmin;
