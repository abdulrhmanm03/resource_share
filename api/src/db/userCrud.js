import dbOps from "./dbOps.js";

export async function createUser(username, email, password) {
    const defaultImage = "defaultImage.png";
    const query =
        "INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)";

    return dbOps.run(query, [username, email, password, defaultImage]);
}

export async function getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;

    return dbOps.get(query, [id]);
}

export async function getUserByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;

    return await dbOps.get(query, [username]);
}

export async function getUserImage(username) {
    const query = `SELECT image FROM users WHERE username = ?`;

    return await dbOps.get(query, [username]);
}

export async function getAllUsers() {
    const query = `SELECT * FROM users`;

    return await dbOps.getAll(query, []);
}

export async function getFollowData(username) {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM followes WHERE followes_id = u.id) AS numFollowes,
        (SELECT COUNT(*) FROM followes WHERE followed_id = u.id) AS numFollowers
      FROM users u 
      WHERE u.username = ?`;

    return await dbOps.get(query, [username]);
}

export async function updateImage(image, user_id) {
    const query = `UPDATE users SET image = ? WHERE id = ?`;

    return await dbOps.run(query, [image, user_id]);
}

export async function updateBio(bio, user_id) {
    console.log(bio);
    const query = `UPDATE users SET bio = ? WHERE id = ?`;

    return await dbOps.run(query, [bio, user_id]);
}

export async function getUserLikes(user_id) {
    const query = `SELECT p.* FROM posts p 
      JOIN likes l ON p.id = l.post_id
      WHERE l.user_id = ?`;

    return await dbOps.getAll(query, [user_id]);
}

export async function follow(followes_id, followed_id) {
    const query = `INSERT INTO followes (followes_id, followed_id) VALUES (?, ?)`;

    return await dbOps.run(query, [followes_id, followed_id]);
}

export async function unFollow(followes_id, followed_id) {
    const query = `DELETE from followes WHERE followes_id = ? AND followed_id = ?`;

    return await dbOps.run(query, [followes_id, followed_id]);
}

export async function isFollowing(user1, user2) {
    const query = `
    SELECT EXISTS (
        SELECT 1 
        FROM followes 
        WHERE followes_id = ? 
        AND followed_id = ?
    ) AS isFollowing`;

    return await dbOps.get(query, [user1, user2]);
}

export async function getUserFollowers(user_id) {
    const query = `
    SELECT u.*
    FROM users u JOIN followes f
    ON u.id = f.followes_id
    WHERE f.followed_id = ?`;

    return dbOps.getAll(query, [user_id]);
}

export async function getUserFollowing(user_id) {
    const query = `
    SELECT u.*
    FROM users u JOIN followes f
    ON u.id = f.followed_id
    WHERE f.followes_id = ?`;

    return dbOps.getAll(query, [user_id]);
}
