export const deleteFromCloudinary = async (url) => {
  try {
    if (!url) return;
    
    // Extract public_id from Cloudinary URL
    const urlParts = url.split('/');
    const fileWithExtension = urlParts[urlParts.length - 1];
    const publicId = urlParts.slice(-2).join('/').split('.')[0];
    
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    // Don't throw error here to avoid breaking the main flow
  }
};
