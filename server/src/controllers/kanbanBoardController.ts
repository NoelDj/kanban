import { FastifyReply, FastifyRequest } from 'fastify'
import { KanbanBoard } from '../entities/KanbanBoard'
import { KanbanColumn } from '../entities/KanbanColumn'


export async function getKanbanBoards(request: FastifyRequest, reply: FastifyReply): Promise<void> { 
    const em = request.di.orm.em.fork()

    const kananBoards = await em.find(KanbanBoard, {user: request.user.id})

    reply.send(kananBoards)
}

export async function createKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    const { title, description } = request.body as Partial<KanbanBoard> || {} 

    if (!title || !description) {
        reply.code(400).send({msg: 'Provide input'})
    }

    const kanbanBoard = em.create(KanbanBoard, { title, description, user: request.user.id })
    await em.persistAndFlush(kanbanBoard)

    reply.code(201).send(kanbanBoard)
}

export async function getKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    
    const { id } = request.params as { id: number } || null

    const kanbanBoard = await em.findOne(KanbanBoard, { id })

    if (!kanbanBoard || kanbanBoard.user?.id !== request.user.id) {
        return reply.code(404).send({ error: 'Board not found' })
    }

    const kanbanColumns = await em.find(KanbanColumn, {kanbanBoard: id})

    kanbanBoard["kanbanColumns"] = kanbanColumns

    reply.send({
        kanbanBoard
    })
}

export async function deleteKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    
    const { id } = request.params as { id: number }

    const kanbanBoard = await em.findOne(KanbanBoard, { id })
    console.log(kanbanBoard)
    if (!kanbanBoard) {
        return reply.code(404).send({ error: 'Board not found' })
    }

    await em.removeAndFlush(kanbanBoard)

    reply.send({ message: 'Board deleted successfully' })
}

export async function updateKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    
    const { id } = request.params as { id: number }
    const { title, description } = request.body as Partial<KanbanBoard>
    

    if (!title || !description) {
        return reply.code(400).send({ error: 'Provide input' })
    }

    const kanbanBoard = await em.findOne(KanbanBoard, { id })

    if (!kanbanBoard) {
        return reply.code(404).send({ error: 'Board not found' })
    }

    if (kanbanBoard) {
        kanbanBoard.title = title
    }

    if (description) {
        kanbanBoard.description = description
    }

    reply.send({ kanbanBoard })
}