import Transaksi from "./Transaksi.js";
import Kamera from "./KameraModels.js";

// Definisikan relasi
Kamera.hasMany(Transaksi, { foreignKey: "kameraId", as: "transaksis" });
Transaksi.belongsTo(Kamera, { foreignKey: "kameraId", as: "kamera" });

export { Transaksi, Kamera };
