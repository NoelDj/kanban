import 'reflect-metadata'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import kanbanBoardRoutes from './routes/kanbanBoardRoutes.ts'
import { initializeORM } from './bootstrap.ts'
import { MikroORM, RequestContext } from "@mikro-orm/core"
import envConfig from "../envConfig"
import authRoutes from './routes/authRoute.ts'
import jwt from 'jsonwebtoken'
import kanbanColumnRoutes from './routes/kanbanColumns.ts'
import cors from '@fastify/cors'


const app = Fastify({ logger: false })

declare module 'fastify' {
  interface FastifyRequest {
    di: any,
    user?: {
        id: string
    }
  }
}


(async () => {
    const base = 'api'
    
    try {
        const DI = await initializeORM(MikroORM)

        await app.register(cors, {
            origin: "http://localhost:5173",
            credentials: true,
            allowedHeaders: ["Authorization", "Content-Type"],
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        })

        
        app.addHook('onRequest', async (req) => {
            RequestContext.create(DI.orm.em, () => {
                req.di = DI
            })
        })

        app.register(authRoutes, { prefix: base + '/auth' }) 
        
        app.register(async (protectedApp) => {
            protectedApp.addHook('preValidation', async (req: FastifyRequest, reply: FastifyReply) => {
                let token = req.headers.authorization
                if (!token) {
                    reply.code(403).send({msg: 'unauthorized'})
                }
                token = token.split(' ')[1]
                try {
                    const user = await jwt.verify(token, envConfig.jwtKey)
                    req.user = user.user
                } catch {
                    reply.code(403).send({msg: 'unauthorized'})
                }
            })

            protectedApp.register(kanbanBoardRoutes, { prefix: base + '/boards' })
            protectedApp.register(kanbanColumnRoutes, { prefix: base + '/columns' })
        })

        
        const {port} = envConfig
        await app.listen({ port })
        console.log(`Running on port ${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
})()