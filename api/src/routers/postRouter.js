import express from "express";
import { createPost, getPost, getPostsWithTopics } from "../db/postCrud.js";
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

postRouter.get("/getPosts", async (req, res) => {
  try {
    const postsWithTopics = await getPostsWithTopics();
    res.json(postsWithTopics);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default postRouter;
