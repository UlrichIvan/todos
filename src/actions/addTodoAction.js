import { ADD_TODO } from "../constants"

export default function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        playload: todo
    }
}