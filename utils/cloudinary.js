// utils/cloudinary.js or same file
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to extract public_id from full Cloudinary URL
function getPublicIdFromUrl(url) {
  const parts = url.split('/');
  const fileNameWithExtension = parts[parts.length - 1]; // image.jpg
  const publicIdWithFolder = parts.slice(parts.indexOf('upload') + 1).join('/'); // folder/image.jpg
  return publicIdWithFolder.replace(/\.[^/.]+$/, ""); // remove .jpg or .png
}

export { cloudinary, getPublicIdFromUrl };
