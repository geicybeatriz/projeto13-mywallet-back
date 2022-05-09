import transitionSchema from "./../Schemas/transitionSchema.js";

export async function transitionValidation(req, res, next){
    const cashRegister = req.body;
    const validation = transitionSchema.validate(cashRegister, {abortEarly:false});
    if (validation.error) {
        return res.status(422).send("Todos os campos devem ser preenchidos!");
    }
    next();
}