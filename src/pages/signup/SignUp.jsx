import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./signup.css"
import { RGX_NAME, INVALID_NAME, USER_ALREADY_EXISTS, REQUEST_FAILED, HOME_PAGE } from "../../constants"
import { createUser } from "../../services/api.services"
import { v4 } from 'uuid'

const SignUp = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const redirect = useNavigate()
    const handlerSubmit = useCallback(async e => {
        e.preventDefault()

        if (RGX_NAME.test(name)) {
            try {
                let res = await createUser({ name, isauth: false, id: v4() })
                if (res.exists) {
                    setError(USER_ALREADY_EXISTS)
                } else {
                    setError('')
                    redirect(HOME_PAGE, { replace: true })
                }
            } catch (error) {
                setError(REQUEST_FAILED)
            }
        } else {
            setError(INVALID_NAME)
        }
    }, [name, redirect])

    const handlerChange = useCallback((namevalue) => {
        setName(namevalue)
        if (RGX_NAME.test(namevalue)) {
            setError("")
        } else {
            setError(INVALID_NAME)
        }
    }, [])

    return (
        <div className='sign_up'>
            <div className="wrapper d-flex align-items-center justify-content-center w-100">
                <form className="form" onSubmit={handlerSubmit}>
                    <div className="container">
                        <h3 className='text-white mb-3 text-center text-capitalize' data-testid="createaccount">create your account</h3>
                        {error && <small className="mb-3 d-block text-danger text-center text-capitalize">
                            {error}
                        </small>}
                        <div className="form-group">
                            <input type="text" value={name}
                                onChange={(e) => handlerChange(e.target.value)}
                                className={error ? "form-control border border-danger" : "form-control"} placeholder='enter your name' />
                        </div>
                        <button data-testid="button" className=" text-capitalize btn btn-success btn-block">signup</button>
                        <Link data-testid="signup" to={HOME_PAGE} className=' mt-2 w-100 d-block text-center text-capitalize'>
                            do you have account ? click here and sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp