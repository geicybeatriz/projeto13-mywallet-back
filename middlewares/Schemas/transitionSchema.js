import joi from "joi";

const transitionSchema = joi.object({ 
    amount: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("entrada", "saida").required()
});

export default transitionSchema;
