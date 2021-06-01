import express from 'express'
import Post from '../models/post.js'

const app = express();

export const posts = () => {
    app.get("/posts/test", (req, res) => res.json({ msg: "Posts Works" }));

    app.get("/posts", (req, res) => {
        Post.find()
            .sort({ date: -1 })
            .then(posts => res.json(posts))
            .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
    });

    app.get("/posts/:id", (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (post) {
                    res.json(post);
                } else {
                    res.status(404).json({ nopostfound: "No post found with that ID" });
                }
            })
            .catch(err =>
                res.status(404).json({ nopostfound: "No post found with that ID" })
            );
    });

    app.post("/posts/create/", (req, res) => {
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });
        console.log(req.body.text);
        newPost.save().then(post => res.json(post));
    });
}