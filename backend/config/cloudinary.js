import { v2 as cloudinary } from "cloudinary";
import { envVars } from "../utils/envVars.js";

cloudinary.config({
	cloud_name: envVars.cloudinaryName,
	api_key: envVars.cloudinaryKey,
	api_secret: envVars.cloudinarySecret,
});

export default cloudinary;