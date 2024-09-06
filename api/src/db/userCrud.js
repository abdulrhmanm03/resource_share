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
        (SELECT COUNT(*) FROM follows WHERE follower_user_id = u.id) AS follows,
        (SELECT COUNT(*) FROM follows WHERE followed_user_id = u.id) AS followed
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

export async function follow(follows_id, followed_id) {
  const query = `INSERT INTO follows (follows_id, followed_id) VALUES (?, ?)`;

  return await dbOps.run(query, [follows_id, followed_id]);
}

export async function unFollow(follows_id, followed_id) {
  const query = `DELETE from follows WHERE follows_id = ? AND followed_id = ?`;

  return await dbOps.run(query, [follows_id, followed_id]);
}

// TODO

// export function getUserLikesCount(username){}

// export function getUserLikedCount(username){}

