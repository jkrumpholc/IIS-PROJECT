import PropTypes from 'prop-types'

export const Button = ({onClick,text}) => {

    

    return (
        <button  className="topnav">
            {text}
        </button>
    )
}

Button.propTypes={

    text: PropTypes.string.isRequired,
}

export default Button