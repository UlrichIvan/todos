import { ADD_TODO, GET_ALL_TODOS, REMOVE_TODO, UPDATE_TODO } from "../constants"
import produce
    from "immer"
export default function getodos(todos = [], action) {
    switch (action.type) {
        case GET_ALL_TODOS:
            return [...action.playload]
        case ADD_TODO:
            return [...todos, action.playload]
        case REMOVE_TODO:
            let newtodos = todos.filter(td => td.id !== action.playload.id)
            return [...newtodos]
        case UPDATE_TODO:
            let index = todos.findIndex(td => td.id === action.playload.id)
            if (index !== -1) {
                let nextState = produce(todos, draft => {
                    draft[index] = { ...draft[index], completed: !action.playload.completed }
                })
                return [...nextState]
            }
            return [...todos]
        default:
            return todos
    }

}