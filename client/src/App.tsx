import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';

import Card from './components/Card';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import { api } from './Constants';
import Board from './pages/Board';

interface B {
    id: number;
    title: string;
    description: string
}

interface Item {
    label: string;
    path: string;
    id: string | number
}


function App() {
    const [boards, setBoards] = useState<Item[]>([])

    useEffect(() => {
        (async () => {
            const data = await api.get<B[]>('boards')
            if(!data) return
            setBoards(data.map((i) => {
                return {
                    label: i.title,
                    path: `/board/${i.id}`,
                    id: i.id
                }
            }))
        })()
    }, [])

    return (
        <BrowserRouter>
            <div className='bg-slate-50 h-full flex'>
                <Sidebar items={boards}/>
                <div className="flex-1 flex flex-col">
                    <header className="h-[60px] bg-slate-50 border border-b border-slate-100 flex items-center px-0 py-1">
                        <p>asd</p>
                    </header>
                    <main className="flex-1 bg-white">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/board/:boardId" element={< Board/>} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App

function Dashboard() {
    return (
        <div>App</div>
    )
}