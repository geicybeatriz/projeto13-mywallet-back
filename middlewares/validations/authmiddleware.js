import authRepository from "../../repositories/authRepository.js";

export async function tokenValidationMid(req, res, next){
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    if(!token) throw {type: "unauthorized", message: "você não está logado!"}

    const session = await authRepository.getSessionByToken(token);
    if(!session) throw {type: "unauthorized", message: "você não está logado!"}

    const user = await authRepository.getUserById(session.userId);
    if(!user) throw {type: "unauthorized", message: "usuário não registrado!"}

    delete user.password;
    res.locals.user = user;
    next();
}