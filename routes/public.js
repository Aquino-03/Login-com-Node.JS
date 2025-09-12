import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/cadastro', async (req, res) => {

    try{
        const {username, senha} = req.body

        if (!email || !senha){
            return res.status(400).json({mensagem: 'Email e senha são obrigatórios.'})
        }

        const saltRounds = 10
        const senhaHash = await bcrypt.hash(senha, saltRounds)

        const sql = "INSERT INTO usuarios (username, senha) VALUES (?,?)"
        const values = [email, senhaHash]

        const [result] = await createPool.execute(sql, values)

        console.log('Usuário inserido com sucesso! ID: ${result.insertID}')
        res.status(201).json({mensagem: 'Usúario cadastrado com sucesso!', usuarioId: result.insertId})
    }
    catch(error){
        console.error('Erro no cadastro:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' });
        }

         res.status(500).json({ mensagem: 'Erro ao processar sua requisição.' })
    }

   
})

export default router