import cloudinary from '../config/cloudinary.js';

export const deleteFromCloudinary = async (publicIdOrUrl, resourceType = "image") => {
  // استخراج الـ public_id من الـ URL إن لزم
  const publicId = extractPublicId(publicIdOrUrl);

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });

  return result;
};

function extractPublicId(url) {
  const parts = url.split("/");
  const fileName = parts.pop();
  const publicId = fileName.split(".")[0];
  return parts.slice(parts.indexOf("upload") + 1).join("/") + "/" + publicId;
}