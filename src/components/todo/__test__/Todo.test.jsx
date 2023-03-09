import { render, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import Todo from "../Todo"

describe.skip("Todo.jsx", () => {
    let removeTodo = jest.fn(), updateStatus = jest.fn(),
        data = {
            "name": "espagnol",
            "completed": false,
            "id": "5e3f218c-75c9-4fa0-97cf-2bca740fda61"
        }

    let mockTodoComponent = (data, _removeTodo, _updateStatus) => {

        return (
            <Router>
                <Todo data={data} removeTodo={_removeTodo} updateStatus={_updateStatus} />
            </Router>
        )
    }

    it("todo should be mount", async () => {
        let { getByTestId, debug } = render(mockTodoComponent(data, removeTodo, updateStatus))
        let liElement = getByTestId('todo')
        expect(liElement).toBeInTheDocument()
        debug()
    })

    it("removeTodo must be call when user click on remove button", async () => {
        let { getByText, debug } = render(mockTodoComponent(data, removeTodo, updateStatus))
        let spanElement = getByText('remove')
        fireEvent.click(spanElement)
        expect(removeTodo).toHaveBeenCalledWith(...[data])
        debug()
    })

    it("checkbox must be change to true", async () => {
        let { getByTestId, debug } = render(mockTodoComponent(data, removeTodo, updateStatus))
        let inputElement = getByTestId('checkbox')
        fireEvent.change(inputElement, { target: { checked: true } })
        expect(inputElement).toBeChecked()
        debug()
    })

    it("updateTodo must be call when user click on input element", async () => {
        let { getByTestId, debug } = render(mockTodoComponent(data, removeTodo, updateStatus))
        let inputElement = getByTestId('checkbox')
        fireEvent.click(inputElement)
        expect(updateStatus).toHaveBeenCalledWith(...[data])
        debug()
    })
})