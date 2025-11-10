import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../entities/User'

export async function registerUser(request: FastifyRequest, reply: FastifyReply): Promise<void> { 
    const em = request.di.orm.em.fork()
    const { password, email }: Partial<User> = request.body || {}

    if (!password && !email) {
        reply.code(400).send({err: 'provide password or email'})
    }

    const existingUser = await em.findOne(User, {
        email
    })

    if (existingUser) {
        reply.code(409).send({msg: 'User already exists'})
    }

    const user = em.create(User, { password, email })
    await em.persistAndFlush(user)
    const {password: _p, ...userData} = user

    reply.code(201).send(userData)
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply): Promise<void> { 
    const em = request.di.orm.em.fork()
    const { password, email }: Partial<User> = request.body || {}

    if (!password && !email) {
        reply.code(400).send({err: 'provide password or email'})
    }

    const existingUser = await em.findOne(User, {
        email
    })

    if (!existingUser) {
        reply.code(400).send({err: 'wrong credentials'})
    }

    if (existingUser.password !== password) {
        reply.code(400).send({err: 'wrong credentials'})
    }

    reply.code(200).send({msg: 'logged in'})
}