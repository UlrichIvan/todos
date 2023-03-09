import { render, fireEvent } from "@testing-library/react"
import FormTodo from "../FormTodo"

describe.skip("FormTodo.jsx", () => {
    let handlerSubmit = jest.fn(), disconnectUser = jest.fn()

    let mockFormTodoComponent = (_handlerSubmit, _disconnectUser) => {
        return (
            <FormTodo handlerSubmit={_handlerSubmit} disconnectUser={_disconnectUser} />
        )
    }

    it('FormTodo should be mounted', async () => {
        let { getByText, debug } = render(mockFormTodoComponent(handlerSubmit, disconnectUser))
        expect(getByText(/add new todo/i)).toBeInTheDocument()
        debug()
    })

    it('change value in input element', async () => {
        let { getByPlaceholderText, debug } = render(mockFormTodoComponent(handlerSubmit, disconnectUser))
        let input = getByPlaceholderText(/enter todo name.../i)
        fireEvent.change(input, { target: { value: "espagnol" } })
        expect(input.value).toBe("espagnol")
        debug()
    })

    it('handlerSubmit must be call when form element is submit', async () => {
        let { getByTestId, getByPlaceholderText, debug } = render(mockFormTodoComponent(handlerSubmit, disconnectUser))
        let input = getByPlaceholderText(/enter todo name.../i)
        let formElement = getByTestId("submit")
        fireEvent.change(input, { target: { value: "espagnol" } })
        fireEvent.submit(formElement)
        expect(handlerSubmit.mock.calls[0][0]).toBe("espagnol")
        debug()
    })

    it('handlerSubmit must be call when form element is submit', async () => {
        let { getByText, debug } = render(mockFormTodoComponent(handlerSubmit, disconnectUser))
        let spanElement = getByText(/logout/i)
        fireEvent.click(spanElement)

        expect(disconnectUser).toHaveBeenCalledTimes(1)
        debug()
    })
})