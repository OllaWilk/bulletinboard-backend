const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts.controller');


router.route('/posts').get(PostController.getAll);
router.route('/posts/getpartposts').get(PostController.getPartPosts);
router.route('/posts/:id').get(PostController.getOne);
router.route('/posts').post(PostController.getPost);
router.route('/posts/:id').put(PostController.getPut);
router.route('/posts/:id').delete(PostController.getDelete);

module.exports = router;