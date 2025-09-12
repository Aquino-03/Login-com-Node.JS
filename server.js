import express from 'express'
import publicRoutes from './routes/public.js'
import { testConnection } from './db.js'

const app = express()

app.use(express.json())

app.use('/cadastro', publicRoutes)

app.listen(3000, () => console.log("Servidor Rodando"))


