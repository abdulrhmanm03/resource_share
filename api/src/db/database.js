import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db");

db.run("PRAGMA foreign_keys = ON;", (err) => {
    if (err) {
        console.error("Failed to enable foreign keys:", err.message);
    } else {
        console.log("Foreign keys are enabled.");
    }
});

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        bio TEXT,
        image TEXT
    )`;

const createPostsTable = `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

const createTopicsTable = `CREATE TABLE IF NOT EXISTS topics (
        post_id INTEGER,
        topic TEXT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`;

const createfollowesTable = `CREATE TABLE IF NOT EXISTS followes (
        followes_id INTEGER,
        followed_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (followes_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

const createLikesTable = `CREATE TABLE IF NOT EXISTS likes (
        post_id INTEGER,
        user_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

const createBookmarksTable = `CREATE TABLE IF NOT EXISTS bookmarks (
        post_id INTEGER,
        user_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

db.serialize(() => {
    db.run(createUserTable);
    db.run(createPostsTable);
    db.run(createTopicsTable);
    db.run(createfollowesTable);
    db.run(createLikesTable);
    db.run(createBookmarksTable);
});

export default db;
