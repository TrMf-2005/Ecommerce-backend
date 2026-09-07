const mongoose = require("mongoose");

// Un seul document existera dans cette collection : les paramètres généraux de la boutique.
const settingsSchema = new mongoose.Schema({
  storeName: {
    type: String,
    default: "Ma Boutique",
    trim: true,
  },
});

module.exports = mongoose.model("Settings", settingsSchema);
