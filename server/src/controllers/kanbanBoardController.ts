import { FastifyReply, FastifyRequest } from 'fastify'
import { KanbanBoard } from '../entities/KanbanBoard'


export async function getKanbanBoards(request: FastifyRequest, reply: FastifyReply): Promise<void> { 
    const em = request.di.orm.em.fork()

    const kananBoards = await em.find(KanbanBoard, {})

    reply.send(kananBoards)
}

export async function createKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    const { title, description } = request.body as Partial<KanbanBoard>
    console.log(title, description)
    if (!title || !description) {
        reply.code(400).send({msg: 'Provide input'})
    }

    const kanbanBoard = em.create(KanbanBoard, { title, description })
    await em.persistAndFlush(kanbanBoard)

    reply.code(201).send(kanbanBoard)
}

export async function getKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    
    const { id } = request.params as { id: number }

    const kanbanBoard = await em.findOne(KanbanBoard, { id })
    
    if (!kanbanBoard) {
        return reply.code(404).send({ error: 'Board not found' })
    }

    reply.send(kanbanBoard)
}

export async function deleteKanbanBoard(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    
    const { id } = request.params as { id: number }

    const kanbanBoard = await em.findOne(KanbanBoard, { id })

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