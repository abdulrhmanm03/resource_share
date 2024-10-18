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

// TODO: change the query to be based on the user id instead of username
export async function getUserPosts(post_id) {
    const query = `
    SELECT 
      p.*, 
      u.username,
      (SELECT GROUP_CONCAT(DISTINCT t.topic ORDER BY t.topic ASC, ', ')
       FROM topics t WHERE t.post_id = p.id) AS topics,
      COUNT(DISTINCT l.user_id) AS like_count,
      GROUP_CONCAT(DISTINCT lu.username ORDER BY lu.username ASC, ', ') AS liked_by
    FROM 
      posts p
    JOIN 
      users u ON p.user_id = u.id
    LEFT JOIN 
      likes l ON p.id = l.post_id
    LEFT JOIN 
      users lu ON l.user_id = lu.id
    WHERE 
      u.username = ?
    GROUP BY 
      p.id, p.title, u.username`;

    return await dbOps.getAll(query, [post_id]);
}

export async function getPostsMeta() {
    const query = `
    SELECT 
      p.*, 
      u.username,
      (SELECT GROUP_CONCAT(DISTINCT t.topic ORDER BY t.topic ASC, ', ')
       FROM topics t WHERE t.post_id = p.id) AS topics,
      COUNT(DISTINCT l.user_id) AS like_count,
      GROUP_CONCAT(DISTINCT lu.username ORDER BY lu.username ASC, ', ') AS liked_by
    FROM 
      posts p
    LEFT JOIN 
      users u ON p.user_id = u.id
    LEFT JOIN 
      likes l ON p.id = l.post_id
    LEFT JOIN
      users lu ON l.user_id = lu.id
    GROUP BY 
      p.id, p.title, u.username `;
    return await dbOps.getAll(query, []);
}

export async function searchPosts(search) {
    const query = `
    SELECT 
      p.id, 
      p.title, 
      u.username,
      (SELECT GROUP_CONCAT(DISTINCT t.topic ORDER BY t.topic ASC , ', ')
       FROM topics t WHERE t.post_id = p.id) AS topics,
      COUNT(DISTINCT l.user_id) AS like_count,
      GROUP_CONCAT(DISTINCT lu.username ORDER BY lu.username ASC , ', ') AS liked_by
    FROM 
      posts p
    LEFT JOIN 
      users u ON p.user_id = u.id
    LEFT JOIN 
      likes l ON p.id = l.post_id
    LEFT JOIN
      users lu ON l.user_id = lu.id
    LEFT JOIN
      topics t ON t.post_id = p.id  -- Add a join for topics here
    WHERE 
      u.username = ?
    OR
      t.topic = ?
    OR 
      p.title = ?
    GROUP BY 
      p.id, p.title, u.username`;

    return await dbOps.getAll(query, [search, search, search]);
}

export async function createPost(user_id, title, topics, content) {
    const createPostQuery = `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`;
    const addTopicsQuery = `INSERT INTO topics (post_id, topic) VALUES (?, ?)`;

    try {
        await dbOps.runCommand("BEGIN TRANSACTION");

        const post_id = await dbOps.run(createPostQuery, [
            user_id,
            title,
            content,
        ]);

        await Promise.all([
            ...topics.map((topic) =>
                dbOps.run(addTopicsQuery, [post_id, topic]),
            ),
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
            ...topics.map((topic) =>
                dbOps.run(addTopicsQuery, [post_id, topic]),
            ),
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

export async function like(user_id, post_id) {
    const query = `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`;

    return await dbOps.run(query, [post_id, user_id]);
}

export async function unLike(user_id, post_id) {
    const query = `DELETE FROM likes WHERE post_id = ? AND user_id = ?`;

    return await dbOps.run(query, [post_id, user_id]);
}

export async function getUserPostCount(user_id) {
    const query = `SELECT COUNT(*) as post_count FROM posts WHERE user_id = ?`;

    return await dbOps.get(query, [user_id]);
}

export async function getPostUser(post_id) {
    const query = `SELECT user_id AS post_owner_id FROM posts WHERE id = ?`;

    return await dbOps.get(query, [post_id]);
}
