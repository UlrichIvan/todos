import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getTodoAction from '../../actions/getTodo'
import { addTodo, getTodos, deleteTodo, updateTodo, logOut } from '../../services/api.services'
import Todo from "../../components/todo/Todo"
import { useDispatch, useSelector } from 'react-redux'
import FormTodo from '../../components/formtodo/FormTodo'
import { INVALID_TODO_NAME, RGX_NAME_TODOS, TOKEN_NAME, HOME_PAGE } from '../../constants'
import addTodoAction from '../../actions/addTodoAction'
import removeTodoAction from '../../actions/removeTodoAction.js'
import updateTodoAction from '../../actions/updateTodoAction.js'
import { v4 } from 'uuid'
import { getStorage, removeStorage } from "../../storage"


const Todos = () => {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const [error, setError] = useState('')
    const handlerSubmit = useCallback(async (todoname, setTodoName, e) => {
        e.preventDefault()
        if (RGX_NAME_TODOS.test(todoname)) {
            try {
                let todo = {
                    name: todoname,
                    completed: false,
                    id: v4()
                }
                await addTodo(todo, (data) => (dispatch(addTodoAction(data))))
                setTodoName('')
            } catch (error) {
                throw new Error(error.message)
            }
        } else {
            setError(INVALID_TODO_NAME)
            setTimeout(() => setError(''), 2000)
        }
    }, [dispatch])
    const redirectTo = useNavigate()
    const removeTodo = useCallback(async (todo) => {
        try {
            await deleteTodo(todo, (data) => dispatch(removeTodoAction(data)))
        } catch (error) {
            throw new Error(error.message)
        }
    }, [dispatch])

    const updateStatus = useCallback(async (todo) => {
        try {
            await updateTodo(todo, (data) => dispatch(updateTodoAction(data)))
        } catch (error) {
            throw new Error(error.message)
        }
    }, [dispatch])


    useEffect(() => {
        (async () => {
            try {
                await getTodos((data) => dispatch(getTodoAction(data)))
            } catch (error) {
                throw new Error(error.message)
            }
        })()
    }, [dispatch])

    const disconnectUser = useCallback(async () => {
        await logOut(getStorage(TOKEN_NAME), () => {
            removeStorage(TOKEN_NAME)
            redirectTo(HOME_PAGE, { replace: true })
        })
    }, [redirectTo])

    return (
        <div className='todos' data-testid="todos">
            <FormTodo handlerSubmit={handlerSubmit} disconnectUser={disconnectUser} />
            <ul className="list-group">
                <div className="container">
                    {error && (<small style={{ fontSize: "1.25rem" }} className="d-block font-weight-bold text-center text-danger text-capitalize">
                        {error}
                    </small>)}
                    {todos && todos.map(todo => (<Todo data-testid="todo"
                        removeTodo={removeTodo}
                        updateStatus={updateStatus}
                        data={todo}
                        key={todo.id}
                    />))}
                </div>
            </ul>
        </div>
    )
}

export default Todos