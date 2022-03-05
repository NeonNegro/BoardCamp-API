import joi from "joi";


const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri(),
    stockTotal: joi.number().required().greater(0),
    categoryId: joi.number(),
    pricePerDay: joi.number().required().greater(0),
});

export default gameSchema;