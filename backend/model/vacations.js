const Joi = require("joi");

class Vacation {

    constructor(vacation) {
        this.vacation_id = vacation.vacation_id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price = vacation.price;
        this.image_name = vacation.image_name;
        this.image = vacation.image;
    }

    static #validationSchema = Joi.object({
        vacation_id: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().min(4).max(250),
        description: Joi.string().required().min(4).max(500),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        price: Joi.number().integer().positive().required().max(10000),
        image_name: Joi.string().optional(),
        image: Joi.optional()
    });

    validate() {
        const result = Vacation.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = Vacation;
