import { FastifyInstance } from 'fastify';
import { createKanbanBoard, deleteKanbanBoard, getKanbanBoard, getKanbanBoards, updateKanbanBoard } from '../controllers/kanbanBoardController';


async function kanbanBoardRoutes(fastify: FastifyInstance) {
    fastify.get('/', getKanbanBoards)
    fastify.post('/', createKanbanBoard)
    fastify.get('/:id', getKanbanBoard)
    fastify.delete('/:id', deleteKanbanBoard)
    fastify.put('/:id', updateKanbanBoard)
}

export default kanbanBoardRoutes;