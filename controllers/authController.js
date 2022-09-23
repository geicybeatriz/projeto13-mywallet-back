import authServices from "../services/authServices.js";

export async function signIn(req, res){
    const token = await authServices.signInService(req.body)
    res.status(200).send(token);
}

export async function signUp(req, res){
    await authServices.signUpService(req.body);
    res.sendStatus(201);
}