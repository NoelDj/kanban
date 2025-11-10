import 'reflect-metadata'
import Fastify from 'fastify'
import kanbanBoardRoutes from './routes/kanbanBoardRoutes.ts'
import { initializeORM } from './bootstrap.ts'
import { MikroORM, RequestContext } from "@mikro-orm/core"
import envConfig from "../envConfig"


const app = Fastify({ logger: false })

declare module 'fastify' {
  interface FastifyRequest {
    di: any
  }
}

(async () => {
    
    try {
        console.log()
        const DI = await initializeORM(MikroORM)
        
        app.addHook('onRequest', async (req) => {
            RequestContext.create(DI.orm.em, () => {
                req.di = DI
            })
        })
        
        
        app.register(kanbanBoardRoutes, { prefix: '/api/boards' })
        
        const {port} = envConfig
        await app.listen({ port })
        console.log(`Running on port ${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
})()