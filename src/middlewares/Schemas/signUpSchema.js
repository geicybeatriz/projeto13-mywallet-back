import joi from "joi";

const userSignUpSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    repeat_password: joi.ref('password')
});

export default userSignUpSchema;
