import { GET_ALL_TODOS } from "../constants"

export default function getTodoAction(todos) {
    return {
        type: GET_ALL_TODOS,
        playload: todos
    }
}