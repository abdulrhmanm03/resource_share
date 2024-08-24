import express from "express";
import { getFollowData, getUserByUsername, updateBio, updateImage } from "../db/userCrud.js";
import fileUpload from "express-fileupload";
import { unlink } from 'fs/promises';

const userRouter = express.Router();

userRouter.use(fileUpload());

userRouter.get('/users',async (req, res) => {
    const users = await getAllUsers();
    res.json(users)
});

userRouter.get('/getUser/:username', async (req, res) => {
    const username = req.params.username;
    const profile_data = await getUserByUsername(username);
    res.json(profile_data)
});

userRouter.get('/getFollowData/:username', async (req, res) => {
    const username = req.params.username;
    const follow_data = await getFollowData(username);
    res.json(follow_data)
})

userRouter.post('/updateprofile', async (req, res) => {

    const {user_id, bio, oldImage} = req.body

    if (!req.files || !req.files.image || !user_id) {
        return res.status(400).send('No file uploaded.');
    }

    try { 
        await unlink(`./uploads/${oldImage}`); 
        console.log(`Deleted ${oldImage}`); 
    } catch (error) { 
        console.error(`Got an error trying to delete the file: ${error.message}`); 
    } 

    const image  = req.files.image;

    image.mv(`./uploads/${image.name}`, (err) => {
        if (err)
          return res.status(500).send(err);
    });

    try{
        await updateImage(image.name, user_id);

        await updateBio(bio, user_id);

        res.send('File uploaded!');
    } 
    catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
})



export default userRouter 