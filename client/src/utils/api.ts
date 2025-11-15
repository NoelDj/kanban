class Api {
    readonly basePath: string;
    options: RequestInit;

    constructor(path: string, options: RequestInit = {}) {
        this.basePath = path
        this.options = options
    }

    async init<T = unknown>(
        path: string,
        data?: any
    ): Promise<T | null> {
        try {
            const res = await fetch(this.basePath + '/' + path, {
                credentials: "include",
                headers: { "Content-Type" : "application/json"},
                ...this.options,
                ...data
            })
    
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                console.log(errorData)
                throw new Error(errorData.message || 'Error')
            }
    
            return res.json().catch(() => null)
        } catch (e) {
            console.log(2)
            console.log(e)
            if (e instanceof Error) throw e
            throw new Error(String(e))
        }
    }

    get<T = unknown>(path: string) {
        return this.init<T>(path)
    }

    post<T = unknown>(path: string, data = {}) {
        console.log(data)
        return this.init<T>(path, {method: "POST", body: JSON.stringify(data)})
    }

    delete<T = unknown>(path: string, data = {}) {
        return this.init<T>(path, {method: "DELETE", body: JSON.stringify(data)})
    }

    put<T = unknown>(path: string, data = {}) {
        return this.init<T>(path, {method: "PUT", body: JSON.stringify(data)})
    }

    patch<T = unknown>(path: string, data = {}) {
        return this.init<T>(path, {method: "PATCH", body: JSON.stringify(data)})
    }
}


export default Api