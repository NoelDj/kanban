import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../Constants"

interface Information {
    id: number;
    title: string;
    description: string
}

interface Board {
    kanbanBoard: Information
}

function Board() {

    const {boardId} = useParams()
    const [boardTitle, setBoardTitle] = useState<string>('')
    const [boardDescription, setBoardDescription] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const data = await api.get<Board>("boards/" + boardId)
            
            if(!data) {
                navigate('/')
            }

            const {title, description} = data.kanbanBoard
            setBoardTitle(title)
            setBoardDescription(description)        
        })()
    }, [boardId])

    async function handleDeleteButton () {
        const data = await api.delete("boards/" + boardId)
        if (!data) return
        navigate('/')
    }

    return (
        <div className="">
            <div className="border-b border-slate-200 p-4 mb-4">
            <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">
                {boardTitle}
            </h1>
            <h2 className="text-slate-500 text-lg mt-1">
                {boardDescription}
            </h2>
            </div>

            <button className="p-2 bg-amber-600 text-white mt-2 cursor-pointer rounded-md" onClick={handleDeleteButton}>Delete Project</button>
        </div>
    )
}

export default Board