import joi from "joi";

const transitionSchema = joi.object({ 
    amount: joi.number(),
    description: joi.string(),
    type: joi.string().valid("entrada", "saida")
});

export default transitionSchema;
