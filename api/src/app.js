import express from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("./uploads"));
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", postRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

