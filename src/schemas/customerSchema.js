import joiImport from "joi";
import dateExtension from "@joi/date";
const joi = joiImport.extend(dateExtension);

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{7}$/).required(),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: joi.alternatives().try(joi.date().format('DDMMYYYY'), joi.date().format('DD/MM/YYYY'), joi.date().format('YYYY-MM-DD')).required(),
});

export default customerSchema;