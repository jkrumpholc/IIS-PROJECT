
import PropTypes from 'prop-types'

export const NavButton = ({onClick,text,redirect}) => {
    
    
    return (
        <a href={redirect} onClick={onClick} className="topnav">
            {text}
        </a>
    )
}


NavButton.propTypes = {
    redirect: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}


export default NavButton