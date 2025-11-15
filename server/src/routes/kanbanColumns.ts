import { FastifyInstance } from 'fastify';
import { createKanbanColumn, deleteKanbanColumn, updateKanbanColumnPosition } from '../controllers/kanbanColumnController';


async function kanbanColumnRoutes(fastify: FastifyInstance) {
    //fastify.get('/', getKanbanBoards)
    fastify.post('/', createKanbanColumn)
    //fastify.get('/:id', getKanbanBoard)
    fastify.delete('/:id', deleteKanbanColumn)
    //fastify.put('/:id', updateKanbanBoard)
    fastify.patch('/:id/move', updateKanbanColumnPosition)
}

export default kanbanColumnRoutes