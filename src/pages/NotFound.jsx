import React, { useState } from 'react'

const NotFound = () => {
    const [count, setCount] = useState(0)

    return (
        <div >
            Page NotFound
            <button data-testid="button" onClick={(_) => setCount(c => c + 1)}>increment count: {count}</button>
        </div>
    )
}

export default NotFound