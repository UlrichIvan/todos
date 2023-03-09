import { UPDATE_TODO } from "../constants"

export default function getTodoAction(todo) {
    return {
        type: UPDATE_TODO,
        playload: todo
    }
}