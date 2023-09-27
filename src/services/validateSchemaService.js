const validateSchemaService = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (err) {
        err.httpStatus = 400; // Bad Request
        err.code = err.details[0].message;
        throw err;
    }
};

module.exports = validateSchemaService;
