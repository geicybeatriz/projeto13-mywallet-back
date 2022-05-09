// import { tokenSchema } from "../Schemas/tokenSchema.js";

// export async function tokenValidate(req, res, next){
//     const token = res.locals.token;
//     const validate = tokenSchema.validate({token: token}, {abortEarly: false});
//     if(validate.error){
//         console.log(validate.error);
//         return res.status(422).send("invalid input");
//     }
//     next();
// }