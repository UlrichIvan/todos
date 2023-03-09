import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FormTodo from "../components/FormTodo"


describe.skip('FormTodo.jsx', () => {

    let handlerSubmit, disconnectUser, user

    beforeEach(() => {
        user = userEvent.setup()
        handlerSubmit = jest.fn()
        disconnectUser = jest.fn()
        render(<FormTodo handlerSubmit={handlerSubmit} disconnectUser={disconnectUser} />)
    })

    it("component should mounted", () => {
        screen.findByPlaceholderText(/enter todo name.../i).then((el) => {
            expect(el).toBeDefined()
            expect(el.value).toBeFalsy()
        })
    })

    it("entered data in input element", () => {
        screen.findByPlaceholderText(/enter todo name.../i).then((el) => {
            el.value = "michel"
            expect(el.value).toBe("michel")
        })
    })

    it("called function handlerSubmit with click on button", () => {
        screen.findByText(/add/i).then(async function (element) {
            await user.click(element)
            expect(handlerSubmit).toHaveBeenCalledTimes(1)
            expect(handlerSubmit).toHaveBeenCalledWith(["todoName", "setTodoName"])
        })
    })

    it("called function disconnectUser with click on button", () => {
        screen.findByText(/logout/i).then(async function (element) {
            await user.click(element)
            expect(disconnectUser).toHaveBeenCalledTimes(2)
        })
    })
})