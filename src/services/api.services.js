import axios from "axios"
import { BASE_URL } from "../constants"

export const login = async ({ name }) => {
    try {
        let res = await axios.get(BASE_URL + "/users", {
            params: { name }
        })

        if (res.data.length === 1) {
            let { islogged } = await updateUser(res.data[0])
            return {
                islogged,
                id: res.data[0].id
            }
        }
        else return false
    } catch (err) {
        console.log(err.message)
    }
}
export const updateUser = async ({ name, id }) => {
    try {
        let res = await axios.put(`${BASE_URL}/users/${id}`, {
            name: name,
            isauth: true,
            id
        })

        return { islogged: (res.status === 200) }
    } catch (error) {
        throw new Error(error.message)

    }
}
export const createUser = async (user) => {
    try {

        let res = await axios.get(BASE_URL + "/users",
            {
                params: { name: user?.name }
            }
        )

        // if user already exists
        if (res.data?.length) {
            return {
                exists: true
            }
        } else {
            // save user in database
            return await axios.post(BASE_URL + "/users", { ...user })
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTodos = async (cb) => {
    try {
        let res = await axios.get(BASE_URL + "/todos")
        cb(res.data)
    } catch (error) {
        throw new Error(error.message)
    }
}
export const addTodo = async (todo, cb) => {
    try {
        let res = await axios.post(BASE_URL + "/todos", { ...todo })
        if (res.data) cb(todo)
    } catch (error) {
        throw new Error(error.message)
    }
}
export const deleteTodo = async (todo, cb) => {
    try {
        let res = await axios.delete(`${BASE_URL}/todos/${todo.id}`)
        if (res.status === 200) cb(todo)
    } catch (error) {
        throw new Error(error.message)
    }
}
export const updateTodo = async (todo, cb) => {
    try {
        let res = await axios.put(`${BASE_URL}/todos/${todo.id}`, { ...todo, completed: !todo.completed })
        if (res.status === 200) cb(todo)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const logOut = async (user, cb) => {
    try {
        if (user && user?.id) {
            let res = await axios.put(`${BASE_URL}/users/${user.id}`, { ...user, isauth: false })
            if (res.status === 200) cb()
        } else {
            cb()
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTodo = async ({ id }) => {
    try {
        let res = await axios.get(`${BASE_URL}/todos/${id}`)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}