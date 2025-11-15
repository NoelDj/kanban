import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../entities/User'
import jwt from 'jsonwebtoken'
import envConfig from '../../envConfig'
import { hashPassword, verifyPassword } from '../utils/auth'
import { compareArrays } from '@mikro-orm/core'

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

    const {salt, hash} = hashPassword(password)

    const user = em.create(User, {
        password: hash,
        email,
        salt
    })

    await em.persistAndFlush(user)
    const {password: _p, salt: _s, ...userData} = user

    reply.code(201).send(userData)
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply): Promise<void> { 
    const em = request.di.orm.em.fork()
    const { password, email }: Partial<User> = request.body || {}

    if (!password && !email) {
        reply.code(400).send({err: 'provide password or email'})
    }

    const user = await em.findOne(User, {
        email
    })

    if (!user || !verifyPassword(password, user.salt, user.password)) {
        reply.code(400).send({err: 'wrong credentials'})
    }

    const token = jwt.sign({
        user: {
            id: user.id
        }
    }, envConfig.jwtKey, { expiresIn: '24h' })

    reply.code(200).send({msg: 'logged in', token})
}