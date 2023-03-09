import { useState } from 'react'
// import { Link } from 'react-router-dom'
const FormTodo = ({ handlerSubmit, disconnectUser }) => {
    const [todoName, setTodoName] = useState('')

    return (
        <>
            <div className="container mt-4">
                <h3 className='text-center text-capitalize text-secondary'>add new todo</h3>
                <form
                    className="form d-flex w-100 align-item-center"
                    onSubmit={handlerSubmit.bind(null, todoName, setTodoName)}
                    data-testid="submit">
                    <input type="text"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        className="form-control text-capitalize"
                        placeholder='enter todo name...' />
                    <button className="btn text-capitalize btn-outline-success ml-2">add</button>
                    <span className="btn text-capitalize btn-outline-info ml-2" onClick={disconnectUser}>logout</span>
                </form>
            </div>
        </>
    )
}

export default FormTodo