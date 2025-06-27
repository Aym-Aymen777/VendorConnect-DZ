export const uploadToCloudinary = async (file, folder = 'company_assets') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type (image/video)
      quality: 'auto:good',
      fetch_format: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};