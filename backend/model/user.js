const Joi = require("joi");

class User {

    constructor(user) {
        this.user_id = user.user_id
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    static #validationSchema = Joi.object({
        user_id: Joi.number().optional().integer().positive(),
        first_name: Joi.string().required().min(3).max(50),
        last_name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(4).max(50).email(),
        password: Joi.string().required().min(4).max(50),
        role: Joi.boolean().optional().default(false)
    });

    validate() {
        const result = User.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = User;