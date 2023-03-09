import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TODOS_PAGE } from '../../constants'


const Todo = ({ data, removeTodo, updateStatus }) => {
    const [checked, setChecked] = useState(data.completed)

    return (
        <>
            <li className={`list-group-item mt-2 d-flex justify-content-between align-items-center 
            ${data.completed ? "bg-dark" : "bg-light"}`} data-testid="todo">
                <span className={`todo-name text-capitalize ${data.completed ? "text-white" : ""}`}>{data.name}</span>
                <div className="todo-options d-flex align-items-center">
                    {(data.completed ? <span className="btn btn-outline-warning" onClick={(e) => {
                        e.preventDefault()
                        removeTodo(data)
                    }}>remove</span> :
                        <span className="btn  btn-outline-danger" onClick={
                            (e) => {
                                e.preventDefault()
                                removeTodo(data)
                            }
                        }>remove</span>)}
                    <Link to={`${TODOS_PAGE}/${data.id}`} data-testid="about">
                        <span className="btn ml-2 btn-outline-info">About</span>
                    </Link>
                    <div className="input-group ml-2" style={{ height: '40px' }}>
                        <div className={`input-group-prepend`}>
                            <div className={`input-group-text ${data.completed ? "bg-success" : ""}`}>
                                <input type="checkbox"
                                    data-testid={`${data.completed ? "checkbox success" : "checkbox"}`}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)
                                        updateStatus(data)
                                    }}
                                    checked={checked} />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )

}

export default Todo