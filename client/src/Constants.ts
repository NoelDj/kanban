import Api from "./utils/api";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyfSwiaWF0IjoxNzYzMjQzNzc5LCJleHAiOjE3NjMzMzAxNzl9.X1vgY9852OS91uktGHNovbGaVD_j91KqOfrekuQqpZg'

export const api = new Api("http://localhost:3000/api", {
    headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
})