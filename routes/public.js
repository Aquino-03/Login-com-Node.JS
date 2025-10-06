import express from 'express'
import bcrypt from 'bcrypt'
import db from '../db.js';
import jwt from 'jsonwebtoken'
import {pool} from '../db.js'
const router = express.Router()

router.post('/login', async (req, res) => {

    try{
        const {username, senha} = req.body

        if (!username || !senha){
            return res.status(400).json({mensagem: 'Email e senha são obrigatórios.'})
        }

        const sql = "SELECT * FROM usuarios WHERE username = ?"
        const [rows] = await pool.execute(sql, [username])

        if(rows.length === 0){
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos.'})
        }

        const usuarios = rows[0]

        const senhaCorreta = await bcrypt.compare(senha, usuarios.senha_hash)

        if (!senhaCorreta){
            return res.status(401).json({ mensagem: 'Usuário ou senha inválidos.'})
        }

        const payload = {
            id: usuarios.id,
            username: usuarios.username
        }

        console.log('Verificando a chave secreta:', process.env.JWT_SECRET);

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )

        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            token: token
        })
    }
    catch(error){
        console.error('Erro no login:', error)
        res.status(500).json({mensagem:'Erro interno no servidor.'})
    }
})


 router.post('/cadastro', async (req,res) => {
        try{
        const {username1, username2, senha1, senha2} = req.body

        if (!username1 || !username2 || !senha1 || !senha2){
            return res.status(400).json({mensagem: 'Email e senha são obrigatórios.'})
        }

        if(senha1 != senha2){
            return res.status(400).json({mensagem: 'As senhas estão diferentes.'})
        }

        if(username1 != username2){
            return res.status(400).json({mensagem: 'Os endereços de E-mail estão diferentes.'})
        }

        const saltRounds = 10
        const senha_hash = await bcrypt.hash(senha1, saltRounds)

        const sql = "INSERT INTO usuarios (username, senha_hash) VALUES (?,?)"
        const values = [username1, senha_hash]

        const [result] = await db.execute(sql, values)

        console.log(`Usuário inserido com sucesso! ID: ${result.insertId}`)
        res.status(201).json({mensagem: 'Usúario cadastrado com sucesso!', usuarioId: result.insertId})
    }
    catch(error){
        console.error('Erro no cadastro:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' })
        }

         res.status(500).json({ mensagem: 'Erro ao processar sua requisição.' })
    }

    
 })

 router.post ('/formulario', async (req, res) => {
        try {
            const {nome, email, telefone, assunto, mensagem} = req.body

            if (!nome || !email || !assunto || !mensagem)
            {
                return res.status(400).json({ mensagem: 'Os dados não estão preenchidos'})
            }

            const sql = "INSERT INTO formulario (nome, email, telefone, assunto, mensagem) VALUES (?,?,?,?,?)"
            const values = [nome, email, telefone, assunto, mensagem]

            const [execute] = await db.execute(sql, values)

            console.log('Formulário enviado com sucesso')
            res.status(201).json({mensagem: 'Formulario enviado com sucesso'})

        }
        catch (error){
            console.error('Erro no contato:', error)
            res.status(500).json({mensagem: 'Erro no preenchimento do formulário', error})
        }

 })

 export default router