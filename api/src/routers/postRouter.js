import express from "express";
import { createPost, getPostsWithTopics } from "../db/postCrud.js";
import { stringToWords } from "../utils/utils.js";
// import authenticateJWT from "../middleware/authenticateJWT.js";

const postRouter = express.Router();

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
