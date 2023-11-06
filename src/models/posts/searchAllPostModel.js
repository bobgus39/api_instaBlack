const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchAllPostModel = async (keyword = '', userId = '') => {
    let connection;

    try {
        connection = await getDb();

        const [posts] = await connection.query(
            `
            SELECT
                P.id,
                P.description,
                P.photo,
                U.username,
                U.avatar,
                Bit_OR(L.userId = ?) AS likedByMe,
                P.userId,
                P.userId = ? AS owner,
                P.createdAt,
                L.postId,
                SUM(CASE WHEN L.postId IS NULL THEN 0 ELSE 1 END) AS numLikes,
                GROUP_CONCAT(DISTINCT UL.username ORDER BY UL.username ASC) AS likedUsernames
            FROM posts P
            INNER JOIN users U ON U.id = P.userId
            LEFT JOIN likes L ON P.id = L.postId
            LEFT JOIN users UL ON L.userId = UL.id
            WHERE P.description LIKE ? Or U.username LIKE ? 
            GROUP BY P.id
            ORDER BY P.createdAt DESC
            `,
            [userId, userId, `%${keyword}%`, `%${keyword}%`]
        );

        // Si no hay posts para mostrar, lanzamos un error.
        if (posts.length < 1) {
            notFoundError();
        }

        for (const post of posts) {
            post.likedByMe = Boolean(post.likedByMe);
            post.owner = Boolean(post.owner);
        }
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchAllPostModel;
