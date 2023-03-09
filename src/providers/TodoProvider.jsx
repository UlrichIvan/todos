import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { RGX_TODO_ID, TODOS_PAGE } from '../constants'
import NotFound from '../pages/NotFound'

function TodoProvider({ children }) {
    const { id } = useParams()
    const { pathname } = useLocation()

    if ((`${TODOS_PAGE}/${id}`) === (pathname) && RGX_TODO_ID.test(id)) return <>{children}</>
    else return <NotFound />

}

export default TodoProvider