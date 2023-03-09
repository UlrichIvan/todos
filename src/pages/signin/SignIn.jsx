import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RGX_NAME, INVALID_NAME, TODOS_PAGE, TOKEN_NAME, REQUEST_FAILED, SIGN_UP_PAGE } from "../../constants"
import { login } from "../../services/api.services"
import "./signin.css"
import { setStorage } from '../../storage'

const SignIn = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const redirect = useNavigate()
    const handlerSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (RGX_NAME.test(name)) {
            try {
                let { islogged, id } = await login({ name })
                if (islogged) {
                    setStorage(TOKEN_NAME, { isauth: islogged, id, name })
                    setError('')
                    setName('')
                    redirect(TODOS_PAGE, { replace: true })
                } else {
                    setError(INVALID_NAME)
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
        <div className='sign_in'>
            <div className="wrapper d-flex align-items-center justify-content-center w-100">
                <form className="form" onSubmit={handlerSubmit}>
                    <div className="container">
                        <h3 className='text-white mb-3 text-center text-capitalize'>Sign In into todos list</h3>
                        {error && <small className="mb-3 d-block text-danger text-center text-capitalize">
                            {error}
                        </small>}
                        <div className="form-group">
                            <input
                                data-testid="input"
                                type="text" value={name}
                                onChange={(e) => handlerChange(e.target.value)}
                                className={error ? "form-control border border-danger" : "form-control"} placeholder='enter your name' />
                        </div>
                        <button className=" text-capitalize btn btn-success btn-block" data-testid="submit">signin</button>
                        <Link data-testid="account" to={SIGN_UP_PAGE} className=' mt-2 w-100 d-block text-center text-capitalize'>
                            you don't have account ? click here and create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn