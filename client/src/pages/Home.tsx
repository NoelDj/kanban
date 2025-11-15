import { useEffect, useState, type FormEvent } from "react"
import { api } from "../Constants";
import { useNavigate } from "react-router";


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyfSwiaWF0IjoxNzYzMTU2MTU1LCJleHAiOjE3NjMyNDI1NTV9.chI6bv93Ui4_y4zbmG7pqTY6cO53esYXItHq6cIfVzI'

export interface Board {
    id: number;
    description: string;
    title: string;
}

function Home() {

    let navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const values = Object.fromEntries(new FormData(e.target).entries());

        const data = await api.post<Board>("boards", values)
        if(!data) return
        navigate(`board/${data.id}`)
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Board</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Home