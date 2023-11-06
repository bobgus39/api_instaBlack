const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras neceasrias.
//const authUser = require('../middlewares/authUser');
const newUser = require('../controllers/users/newUser');
const loginUser = require('../controllers/users/loginUser');
const getUserProfile = require('../controllers/users/getUserProfile');
const editUser = require('../controllers/users/editUser');
const { authUser } = require('../middlewares');
//const getOwnUser = require('../controllers/users/getOwnUser');

//Crear un usuario.
router.post('/users/signup', newUser);

// Login de usuario.
router.post('/users/login', loginUser);

//Obtenemos información del usuario
router.get('/users/:userId', getUserProfile);

//editamos el usuario
router.post('/users/edit', authUser, editUser);

//Obtener perfil privado de un usuario
//router.get('/users', authUser, getOwnUser);

module.exports = router;
