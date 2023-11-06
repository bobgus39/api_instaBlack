const editUserModel = require('../../models/users/editUserModel');
const savePhotoService = require('../../services/savePhotoService');

const editUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { oldUsername } = req.query;
        const { avatar } = req.files;
        const nameAvatar = await savePhotoService(avatar, 500);
        // Obtenemos los datos del usuario.
        await editUserModel(oldUsername, nameAvatar, username, password);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUser;
