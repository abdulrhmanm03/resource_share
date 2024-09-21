import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPostsMeta,
    getUserPostCount,
    getUserPosts,
    like,
    searchPosts,
    unLike,
} from "../db/postCrud.js";
import { stringToWords } from "../utils/utils.js";
// import authenticateJWT from "../middleware/authenticateJWT.js";

const postRouter = express.Router();

postRouter.get("/getPost/:post_id", async (req, res) => {
    try {
        const post_id = parseInt(req.params.post_id, 10);
        const post = await getPost(post_id);
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

postRouter.post("/createPost", async (req, res) => {
    const post = req.body;
    const topics = stringToWords(post.topics);
    try {
        await createPost(post.user_id, post.title, topics, post.content);
        res.send("post created");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// TODO: check if the user have the premesion to delete the post
postRouter.delete("/deletePost", async (req, res) => {
    const { post_id } = req.body;
    console.log(post_id);

    try {
        await deletePost(post_id);

        res.send("Post deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

postRouter.get("/getPosts", async (req, res) => {
    try {
        const postsWithTopics = await getPostsMeta();
        res.json(postsWithTopics);
    } catch (err) {
        res.status(500).send(err);
    }
});

// TODO: add error handling
postRouter.get("/getUserPosts/:username", async (req, res) => {
    const username = req.params.username;
    const posts = await getUserPosts(username);
    res.json(posts);
});

postRouter.get("/searchPost/:query", async (req, res) => {
    const query = req.params.query;
    try {
        const results = await searchPosts(query);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

postRouter.get("/getPostCount/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const post_count = await getUserPostCount(username);
        res.json(post_count);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

postRouter.post("/toggleLike", async (req, res) => {
    const { user_id, post_id, is_liked } = req.body;
    if (is_liked) {
        await unLike(user_id, post_id);
        res.send("post unliked");
    } else {
        await like(user_id, post_id);
        res.send("post liked");
    }
});

export default postRouter;
