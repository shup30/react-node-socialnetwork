const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  isPoster,
  updatePost,
  deletePost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/", getPosts);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

//any routes containing :userId, our app will first execute userByid()
router.param("userId", userById);

module.exports = router;
