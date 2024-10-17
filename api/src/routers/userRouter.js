import express from "express";
import {
    follow,
    getFollowData,
    getUserByUsername,
    getUserFollowers,
    getUserFollowing,
    isFollowing,
    unFollow,
    updateBio,
    updateImage,
} from "../db/userCrud.js";
import fileUpload from "express-fileupload";
import { unlink } from "fs/promises";
import authenticateJWT from "../middleware/authenticateJWT.js";

const userRouter = express.Router();

userRouter.use(fileUpload());

// TODO: add error handling
userRouter.get("/users", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

// TODO: add error handling
userRouter.get("/getUser/:username", async (req, res) => {
    const username = req.params.username;
    const profile_data = await getUserByUsername(username);
    res.json(profile_data);
});

userRouter.get("/getFollowData/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const followData = await getFollowData(username);
        res.json(followData);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

userRouter.get("/isFollowing", async (req, res) => {
    const { user1, user2 } = req.query;
    console.log(user1, user2, typeof user1);

    try {
        const following = await isFollowing(user1, user2);
        console.log(following);
        res.json(following);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

userRouter.post("/toggleFollow", async (req, res) => {
    const { user1, user2, isFollowing } = req.body;

    try {
        if (isFollowing) {
            await unFollow(user1, user2);
        } else {
            await follow(user1, user2);
        }
        res.send("success");
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

userRouter.get("/getFollowers/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const followers = await getUserFollowers(user_id);
        res.json(followers);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

userRouter.get("/getFollowing/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const following = await getUserFollowing(user_id);
        res.json(following);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

userRouter.put("/updateprofile", authenticateJWT, async (req, res) => {
    const { user } = req;
    const { user_id, bio, oldImage } = req.body;
    if (user.id != user_id) {
        return res.status(401).send("UNAUTHORIZED");
    }

    if (bio) {
        await updateBio(bio, user_id);
    }

    if (!req.files || !req.files.image) {
        return res.send("profile updated!");
    }

    if (oldImage != "defaultImage.png") {
        try {
            await unlink(`./uploads/${oldImage}`);
            console.log(`Deleted ${oldImage}`);
        } catch (error) {
            console.error(
                `Got an error trying to delete the file: ${error.message}`,
            );
        }
    }

    const image = req.files.image;
    const image_name = `${image.name}_${user_id}`;
    image.mv(`./uploads/${image_name}`, (err) => {
        if (err) return res.status(500).send(err);
    });

    try {
        await updateImage(image_name, user_id);
        res.send("profile updated!");
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

export default userRouter;
