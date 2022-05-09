import userSignInSchema from "../Schemas/signInSchema.js";
import chalk from "chalk";

export async function signInValidate(req, res, next){
    const {email, password} = req.body;
    
    const validate = userSignInSchema.validate({
        email: email,
        password: password,
    },{abortEarly: false});

    if (validate.error) {
        console.log(chalk.bold.red("Deu erro"));
        return res.status(422).send("Erro na validação de login");
    }
    next();
}