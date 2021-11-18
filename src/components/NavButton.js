
import PropTypes from 'prop-types'

export const NavButton = ({text,redirect}) => {
    return (
        <a href={redirect} className="topnav">
            {text}
        </a>
    )
}


NavButton.propTypes = {
    redirect: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}


export default NavButton