// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require('../../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para obtener los post de un usuario en concreto.
const searchPostsUserModel = async (userId) => {
    let connection;

    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT
            P.id AS postId,
            P.description,
            P.photo,
            U.username AS postUsername,
            P.userId AS postUserId,
            P.createdAt,
            L.totalLikes,
            GROUP_CONCAT(U_like.username) AS likedByUsernames
        FROM posts P
        INNER JOIN users U ON U.id = P.userId
        LEFT JOIN (
            SELECT postId, COUNT(*) AS totalLikes
            FROM likes
            GROUP BY postId
        ) L ON P.id = L.postId
        LEFT JOIN likes L2 ON P.id = L2.postId
        LEFT JOIN users U_like ON L2.userId = U_like.id
        WHERE P.userId = ?
        GROUP BY P.id, P.description, P.photo, P.userId, P.createdAt, L.totalLikes
        ORDER BY P.createdAt DESC;
        
            `,
            [userId]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (posts.length < 1) {
            notFoundError();
        }
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchPostsUserModel;
