const insertUserModel = require('../../models/users/insertUserModel');
const validateSchemaService = require('../../services/validateSchemaService');
const newUserSchema = require('../../schemas/users/newUserSchema');

const defaultImg =
    '77987158-diseño-gráfico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg';

const newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await validateSchemaService(newUserSchema, req.body);

        // Insertamos el usuario.
        await insertUserModel(username, email, password, defaultImg);

        // Devolvemos un status 201 junto con la respuesta.
        res.status(201).send({
            status: 'created',
            message: 'Usuario creado',
            username: username,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
