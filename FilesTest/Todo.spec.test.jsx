import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router } from "react-router-dom"
// import userEvent from "@testing-library/user-event"
import Todo from "../components/Todo"


describe.skip('Todo.jsx', () => {
    let data, removeTodo, updateStatus, user

    beforeEach(() => {
        data = [
            {
                "id": "38e5c2e0-9962-433b-b9af-66c5d00d8ggf8",
                "name": "maths",
                "completed": true
            },
        ]

        removeTodo = jest.fn()
        updateStatus = jest.fn()
        user = userEvent.setup()

        render(<Router><Todo data={data} removeTodo={removeTodo} updateStatus={updateStatus} /></Router>)
    })

    it("component should mounted", () => {
        screen.findByText(/remove/i).then(function (el) {
            expect(el).toBeDefined()
            expect(el.value).toBeFalsy()
        })
    })

    it("called removeTodo function with data argument", () => {
        screen.findAllByText(/remove/i).then(async function (elements) {
            await user.click(elements[0])
            expect(removeTodo).toHaveBeenCalledTimes(1)
            expect(removeTodo.mock.calls[0][0]).toBe(data)
        })
    })

    it("checked button from todo element and call updateStatus function", () => {
        screen.findByTestId(/success/i).then(async function (element) {
            await user.click(element)
            expect(removeTodo).toHaveBeenCalledTimes(1)
            expect(removeTodo.mock.calls[0][0]).toBe(data)
        })
    })
})