import PropTypes from 'prop-types'

export const Button = ({text}) => {
    return (
        <button className="button">
            {text}
        </button>
    )
}

Button.propTypes={

    text: PropTypes.string.isRequired,
}

export default Button