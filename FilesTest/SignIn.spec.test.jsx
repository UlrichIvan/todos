import { getByTestId, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HOME_PAGE, NOT_FOUND, SIGN_UP_PAGE, TODOS_PAGE } from "../constants"
import NotFound from "../pages/NotFound"
import SignIn from "../pages/signin/SignIn"
import SignUp from "../pages/signup/SignUp"

describe.skip('signIn.jsx', () => {
    let user
    beforeEach(() => {

        render(<Router>
            <Routes>
                <Route path={HOME_PAGE} element={<SignIn />} />
                <Route path={SIGN_UP_PAGE} element={<SignUp />} />
                <Route path={NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>)

        user = userEvent.setup()
    })

    it("component should mounted and input should be empty ", () => {
        screen.findByTestId('input').then((el) => {
            expect(el).toBeDefined()
            expect(el.value).toBeFalsy()
        })
    })

    it("valid name of user ", () => {
        screen.findByTestId('input').then(function (el) {
            el.value = "michel"
            expect(el.value).toBe("michel")
        })
    })

    it("redirect user to signUp page", async () => {
        await user.click(screen.getByTestId("account"))
        expect(screen.getByText(/create your account/i)).toBeInTheDocument()
    })

    it("invalid name of user ", () => {
        screen.findByTestId('submit').then(async function (el) {
            await user.click(el)
            screen.findByTestId('input').then((input) => {
                expect(input).toHaveClass("border border-danger")
            })
        })
    })
})