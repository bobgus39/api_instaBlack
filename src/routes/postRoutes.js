const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const {
    postExists,
    authUser,
    userExist,
    authUserOptional,
} = require('../middlewares');

const {
    getPostController,
    likePostController,
    newPostController,
    getPostsUserController,
    getPostsController,
} = require('../controllers/posts');

//Nuevo post.
router.post('/posts', authUser, userExist, newPostController);

// Obtener posts por su publicacion de forma descendente
router.get('/posts', authUserOptional, getPostsController);

// Devolver ordenados los posts de un usuario.
router.get('/users/:userId/posts', getPostsUserController);

//obtener posts pos su id (<<<<<<LO VOY A BORRAR>>>>>>>>)
router.get('/posts/:postId', postExists, getPostController);

// Likes.
router.post(
    '/posts/:postId/likes',
    authUser,
    userExist,
    postExists,
    likePostController
);

module.exports = router;
