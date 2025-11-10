import { FastifyInstance } from 'fastify';
import { loginUser, registerUser } from '../controllers/authController';


async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/register', registerUser)
    fastify.post('/login', loginUser)
    //fastify.get('/refresh-token', getKanbanBoard)
}

export default authRoutes;