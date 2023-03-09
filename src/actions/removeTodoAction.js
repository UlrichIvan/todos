import { REMOVE_TODO } from "../constants"

export default function removeTodoAction(todo) {
    return {
        type: REMOVE_TODO,
        playload: todo
    }
}