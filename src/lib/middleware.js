import jwt from "jsonwebtoken";

export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        return decoded;
    } catch (error) {
        console.error("Token verification error:", error);
        return { error: "Token is not valid", status: 401 };
    }
}
