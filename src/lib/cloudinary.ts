// Configurazione Cloudinary per upload e gestione immagini
import { v2 as cloudinary } from "cloudinary";

// Configura Cloudinary con le credenziali dal file .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
