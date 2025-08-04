import jwt from "jsonwebtoken";
import { envVars } from "../utils/envVars.js";

export const generateTokenAndSetCookies = (user, res) => {
	const token = jwt.sign({ id: user._id , role:user.role  }, envVars.jwtSecret, { expiresIn: "15d" });
	res.cookie("jwt-Company", token, {
		path: "/",
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
		httpOnly:true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: envVars.nodeEnv === "production",	 // set to true if using HTTPS, false for HTTP
	});

	return {token, user};
};