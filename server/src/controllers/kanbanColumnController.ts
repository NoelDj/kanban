import { FastifyReply, FastifyRequest } from 'fastify'
import { KanbanColumn } from '../entities/KanbanColumn'
import { KanbanBoard } from '../entities/KanbanBoard'

export async function createKanbanColumn(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()
    const { content, label }: Partial<KanbanColumn> = request.body || {}

    if (!content || !label ) {
        reply.code(400).send({msg: 'Provide input'})
    }

    
    const kanbanColumns = await em.find(KanbanColumn, {})
    const maxPosition = Math.max(...kanbanColumns.map(e => e.position))
    const position = maxPosition + 1

    const kanbanColumn = em.create(KanbanColumn, { content, label, position, kanbanBoard: 10 })
    await em.persistAndFlush(kanbanColumn)


    reply.code(201).send({kanbanColumns})
}

export async function deleteKanbanColumn(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const em = request.di.orm.em.fork()
        
        const { id } = request.params as { id: number }
    
        const kanbanColumn = await em.findOne(KanbanColumn, { id })
    
        if (!kanbanColumn) {
            return reply.code(404).send({ error: 'Column not found' })
        }
    
        await em.removeAndFlush(kanbanColumn)
    
        reply.send({ message: 'Column deleted successfully' })
}

//update kanban column

export async function updateKanbanColumnPosition(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const em = request.di.orm.em.fork()

    const { id } = request.params as { id: number }
    const { position } = request.body as {position: number} || {}
    const kanbanColumn = await em.findOne(KanbanColumn, { id })

    if (!kanbanColumn) {
        return reply.code(404).send({ error: 'Column not found' })
    }

    if (kanbanColumn.position === position) {
        reply.code(400).send({ error: 'Column cannot be moved' })
    }

    const boardId = kanbanColumn.kanbanBoard.id
    const kanbanColumns = await em.find(KanbanColumn, {kanbanBoard: boardId})


    reply.send({
        kanbanColumn
    })
}


//move kanban column