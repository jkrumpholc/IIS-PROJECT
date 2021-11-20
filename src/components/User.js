import React from 'react'

export const User = ({user}) => {
    return (
        <div>
            {Object.keys(user).length !== 0 &&
                <div>logged in: {user}</div>
            }
        </div>
    )
}
