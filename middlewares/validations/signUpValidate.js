import userSignUpSchema  from "../Schemas/signUpSchema.js";
import chalk from "chalk";

export async function signUpValidate(req, res, next){
    const {name, email, password, repeat_password} = req.body;
    if(password !== repeat_password){
        return res.status(422).send("as senhas devem ser iguais");
    }

    const validate = userSignUpSchema.validate({
        name: name,
        email: email,
        password: password,
        repeat_password: repeat_password
    },{abortEarly: false});

    if (validate.error) {
        console.log(chalk.bold.red("Deu erro"));
        return res.status(422).send("Erro na validação");
    }
    next();
}
