import { render, fireEvent, findAllByText, screen } from "@testing-library/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from 'react-redux';
import { reducers } from "../../../store"
import { configureStore } from "@reduxjs/toolkit"
import axios from "axios"

import Todos from "../Todos"
import SignIn from "../../signin/SignIn"
import AboutTodo from "../AboutTodo"
import { act } from "react-dom/test-utils";

const store = configureStore({
    reducer: { ...reducers },
})

jest.mock("axios")

describe.skip("Todo.jsx", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => window.history.pushState({}, "", "/todos"))


    let MockTodosComponent = () => {
        return (
            <Provider store={store} >
                <Router>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/todos" element={<Todos />} />
                        <Route path="/todos/:id" element={<AboutTodo />} />
                    </Routes>
                </Router>
            </Provider>
        )
    }

    let mockAxios = () => {
        axios.get.mockResolvedValue({
            data: [
                {
                    "name": "management",
                    "completed": true,
                    "id": "9ff3180e-a6cf-46fd-9d76-5d5e4317217b"
                },
                {
                    "name": "espagnol",
                    "completed": false,
                    "id": "5e3f218c-75c9-4fa0-97cf-2bca740fda61"
                },
            ]
        })

        axios.post.mockResolvedValue({
            data: {
                "name": "treading",
                "completed": false,
                "id": "9ff3180e-a6cf-46fd-9d76-5d5e4317217c"
            }
        })

        axios.delete.mockResolvedValue({
            status: 200
        })
        axios.put.mockResolvedValue({
            status: 200
        })
    }

    it('FormTodo should be mounted', async () => {
        mockAxios()
        await act(async () => {
            render(<MockTodosComponent />)
        })
        expect(screen.getByTestId("todos")).toBeInTheDocument()
        // screen.debug()
    })

    it('Todo should be in document', async () => {

        mockAxios()
        await act(async () => {
            render(<MockTodosComponent />)
        })
        expect((await screen.findAllByTestId("todo")).length).toBeGreaterThan(0)
        // screen.debug()
    })

    it('Add todo in document', async () => {

        mockAxios()

        await act(async () => {
            render(<MockTodosComponent />)
        })

        let input = screen.getByPlaceholderText(/enter todo name.../i)

        await act(async () => {
            fireEvent.change(input, { target: { value: "treading" } })
        })
        let formElement = screen.getByTestId('submit')
        let todosBefore = await screen.findAllByTestId("todo")

        await act(async () => {
            fireEvent.submit(formElement)
        })
        let todosAfter = await screen.findAllByTestId("todo")

        expect(todosAfter.length).toEqual(todosBefore.length + 1)
        // screen.debug()
    })

    it('Remove todo in document', async () => {

        mockAxios()

        await act(async () => {
            render(<MockTodosComponent />)
        })

        let todosBeforeRemoved = screen.getAllByText(/remove/i)

        await act(async () => {
            fireEvent.click(todosBeforeRemoved[0])
        })

        let todosAfterRemoved = await screen.findAllByText(/remove/i)

        expect(todosBeforeRemoved.length).toEqual(todosAfterRemoved.length + 1)
        // screen.debug()
    })

    it('about todo ', async () => {

        mockAxios()

        await act(async () => {
            render(<MockTodosComponent />)
        })

        let todosBeforeAbout = screen.getAllByText(/about/i)

        fireEvent.click(todosBeforeAbout[0])

        let spanElement = await screen.findByText(/Todo name/i)

        expect(spanElement).toBeInTheDocument()
        // screen.debug()
    })

    it('logout user ', async () => {

        mockAxios()

        await act(async () => {
            render(<MockTodosComponent />)
        })

        let logout = screen.getByText(/logout/i)

        fireEvent.click(logout)

        let spanElement = await screen.findByText(/Sign In/i)

        expect(spanElement).toBeInTheDocument()
        screen.debug()
    })

    it('ckecked input ', async () => {

        mockAxios()

        await act(async () => {
            render(<MockTodosComponent />)
        })


        await act(async () => {
            fireEvent.click(screen.getByTestId('checkbox success'))
        })


        expect(screen.queryByTestId('checkbox success')).toBeNull()
        screen.debug()
    })

})