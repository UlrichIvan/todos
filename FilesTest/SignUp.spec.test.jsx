import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "../pages/signup/SignUp"
import NotFound from "../pages/NotFound"
import SignIn from "../pages/signin/SignIn"
import { NOT_FOUND, SIGN_UP_PAGE, HOME_PAGE } from "../constants"

describe.skip('SignUp.jsx', () => {
    let user

    beforeEach(() => {
        render(<Router>
            <Routes>
                <Route path={SIGN_UP_PAGE} element={<SignUp />} />
                <Route path={HOME_PAGE} element={<SignIn />} />
                <Route path={NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>)
        user = userEvent.setup()
    })

    it("component should mounted and input should be empty ", async () => {
        await user.click(await screen.findByTestId("account"))
        screen.findByPlaceholderText(/enter your name/i).then((el) => {
            expect(el).toBeDefined()
            expect(el.value).toBeFalsy()
        })
    })

    it("redirect user to signIn page when click on link below of button submit", async () => {
        await user.click(await screen.findByTestId("signup"))
        expect(await screen.findByText(/Sign In into todos list/i)).toBeInTheDocument()
    })

    it("invalid name of user ", async () => {
        await user.click(await screen.findByTestId("account"))
        await user.click(await screen.findByTestId("button"))
        expect(screen.getByPlaceholderText(/enter your name/i)).toHaveClass("border border-danger")
    })
})