import dbOps from "./dbOps.js";

export async function getPost(post_id) {
  const query = `
    SELECT 
      p.*, 
      u.username, 
      GROUP_CONCAT(t.topic,', ') AS topics
    FROM 
      posts p
    LEFT JOIN 
      topics t ON p.id = t.post_id
    JOIN 
      users u ON p.user_id = u.id
    WHERE 
      p.id = ? 
    GROUP BY 
      p.id, u.username
  `;

  return await dbOps.get(query, [post_id]);
}
export async function getUserPosts(username) {
  const query = `SELECT p.id, p.title,GROUP_CONCAT(t.topic, ', ') AS topics
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN topics t ON p.id = t.post_id
      WHERE u.username = ?
      GROUP BY p.id, p.title`;

  return await dbOps.getAll(query, [username]);
}

export async function getPostsWithTopics() {
  const query = `
    SELECT 
      p.id, 
      p.title, 
      GROUP_CONCAT(t.topic, ', ') AS topics
    FROM 
      posts p
    LEFT JOIN 
      topics t ON p.id = t.post_id
    GROUP BY 
      p.id, p.title
  `;
  return await dbOps.getAll(query, []);
}

export async function createPost(user_id, title, topics, content) {
  const createPostQuery = `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`;
  const addTopicsQuery = `INSERT INTO topics (post_id, topic) VALUES (?, ?)`;

  try {
    await dbOps.runCommand("BEGIN TRANSACTION");

    const post_id = await dbOps.run(createPostQuery, [user_id, title, content]);

    await Promise.all([
      ...topics.map((topic) => dbOps.run(addTopicsQuery, [post_id, topic])),
    ]);

    await dbOps.runCommand("COMMIT");
    return post_id;
  } catch (err) {
    await dbOps.runCommand("ROLLBACK");
    throw err;
  }
}

export async function deletePost(post_id) {
  const query = `DELETE FROM posts WHERE id = ?`;
  return dbOps.run(query, [post_id]);
}

export async function updatePost(post_id, title, topics, content) {
  const updatePostQuery = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
  const deleteTopicsQuery = `DELETE FROM topics WHERE post_id = ?`;
  const addTopicsQuery = `INSERT INTO topics (post_id, topic) VALUES (?, ?)`;

  try {
    await dbOps.runCommand("BEGIN TRANSACTION");

    await dbOps.run(deleteTopicsQuery, [post_id]);

    await Promise.all([
      dbOps.run(updatePostQuery, [title, content, post_id]),
      ...topics.map((topic) => dbOps.run(addTopicsQuery, [post_id, topic])),
    ]);

    await dbOps.runCommand("COMMIT");
    return post_id;
  } catch (err) {
    await dbOps.runCommand("ROLLBACK");
    throw err;
  }
}

export async function getPostLikesCount(post_id) {
  const query = `SELECT count(*) FROM likes WHERE post_id = ?`;

  return dbOps.get(query, [post_id]);
}

export async function like(post_id, user_id) {
  const query = `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`;

  return await dbOps.run(query, [post_id, user_id]);
}

export async function unLike(user_id, post_id) {
  const query = `DELETE FROM likes WHERE post_id = ? AND user_id = ?`;

  return await dbOps.run(query, [post_id, user_id]);
}
