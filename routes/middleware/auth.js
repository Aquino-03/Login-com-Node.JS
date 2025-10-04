import jwt from 'jsonwebtoken';

function verificarToken(req, res, next) {
    // O token geralmente é enviado no header 'Authorization' no formato "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega só a parte do token

    if (token == null) {
        // Se não houver token, retorna erro 401 (Não Autorizado)
        return res.status(401).json({ mensagem: 'Acesso negado: token não fornecido.' });
    }

    // jwt.verify() checa se o token é válido usando nossa chave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            // Se o token for inválido ou expirado, retorna erro 403 (Proibido)
            return res.status(403).json({ mensagem: 'Acesso negado: token inválido.' });
        }

        // Se o token for válido, salvamos os dados do usuário na requisição
        // para que a próxima função (a rota final) possa usá-los.
        req.usuario = usuario;
        
        // next() passa para a próxima etapa (a função da rota)
        next();
    });
}

export { verificarToken };