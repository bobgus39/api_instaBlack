const bcrypt = require('bcrypt');
const getDb = require('../../db/getDb');

const editUserModel = async (oldUsername, nameAvatar, username, password) => {
    let connection;
    console.log('parametros: ', oldUsername, nameAvatar, username, password);
    try {
        connection = await getDb();

        // Primero, verifica si el usuario ya existe en la base de datos.
        const existingUser = await connection.query(
            'SELECT avatar, password, username FROM users WHERE username = ?',
            [oldUsername]
        );
        console.log(existingUser.length);
        if (existingUser.length === 2) {
            // Si no se encuentra ningún usuario con el nombre de usuario antiguo, realiza una inserción.
            const hashedPass = await bcrypt.hash(password, 10);

            await connection.query(
                'UPDATE users SET avatar = ?, username = ?, password = ? WHERE username = ?',
                [nameAvatar, username, hashedPass, oldUsername]
            );
        } else console.log('error en el old username');
        return nameAvatar;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = editUserModel;
