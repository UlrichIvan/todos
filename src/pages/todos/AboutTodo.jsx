import { Link, useParams } from 'react-router-dom'
import { getTodo } from "../../services/api.services"
import produce from 'immer'
import { useState, useEffect } from 'react'
import { TODOS_PAGE } from '../../constants'
const AboutTodo = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState(null)


    useEffect(() => {
        (async () => {
            let td = await getTodo({ id })
            setTodo(produce({}, draft => {
                draft.id = td.id
                draft.name = td.name
                draft.completed = td.completed
            }))
        })()
    }, [id])


    return (
        <div className='todo_details'>
            <div className="container mt-4">
                {todo && (<div className="todo-details bg-dark p-2 d-flex align-items-center justify-content-between">
                    <div className="todo-name text-capitalize text-white">Todo name: {todo.name}</div>
                    <div className="todo-status">
                        <div className="input-group ml-2" style={{ height: '40px' }}>
                            <div className={`input-group-prepend`}>
                                <div className={`input-group-text text-white text-capitalize ${todo.completed ? "bg-success" : "bg-danger"}`}>
                                    completed:{todo.completed ? "ok" : "not yet"}
                                </div>
                            </div>
                            <Link to={`${TODOS_PAGE}`}>
                                <span className="btn ml-2 btn-outline-info text-capitalize">all todos</span>
                            </Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default AboutTodo