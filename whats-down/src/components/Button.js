import PropTypes from 'prop-types'

const Button = ({ color, label, onClick }) => {
    return (
        <div>Button</div>
    )
}



Button.defaultProps = {
}

Button.PropTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button