import { Navigate, useLocation } from 'react-router-dom'
import { HOME_PAGE, TOKEN_NAME, SIGN_UP_PAGE, TODOS_PAGE } from '../constants'
import NotFound from '../pages/NotFound'
import { getStorage } from '../storage'

const AuthProvider = ({ children }) => {
    let token = getStorage(TOKEN_NAME)
    let location = useLocation()

    if ([SIGN_UP_PAGE, HOME_PAGE].includes(location.pathname)) {
        if (!token?.isauth) return (<>{children}</>)
        else return <Navigate to={TODOS_PAGE} replace={true} />
    }
    else if (TODOS_PAGE === location.pathname) {
        // console.log(getStorage(TOKEN_NAME))
        if (token?.isauth) return (<>{children}</>)
        else return <Navigate to={HOME_PAGE} replace={true} />
    } else {
        return <NotFound />
    }

}

export default AuthProvider