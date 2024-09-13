import jwt from "jsonwebtoken";

export const JWT_SECRET = "jwt_secret";

export function createJWT(id, username, email) {
    const user = { id, username, email };
    return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });
}
