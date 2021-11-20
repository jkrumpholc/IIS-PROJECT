import React from 'react'

export const User = ({user}) => {

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
    <li>{number}</li>
    );

    return (
        <div>
            {Object.keys(user).length !== 0 &&
                <p>logged in: {user}</p>
            }
            {Object.keys(user).length !== 0 && <div>
                <p>Moje konferencie</p>
                <ul>{listItems}</ul></div>
            }
            {Object.keys(user).length !== 0 && <div>
                <p>Moje prezentacie</p>
                <ul>{listItems}</ul></div>
            }
            {Object.keys(user).length !== 0 && <div>
                <p>Moje vstupekny</p>
                <ul>{listItems}</ul></div>
            }
        </div>
    )
}
