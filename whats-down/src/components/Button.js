import PropTypes from 'prop-types'

const Button = ({ color, label, onClick, classy }) => {
    return (
        <button class={classy} onClick={onClick} type="button" style={{ backgroundColor: color }}> {label}</button >
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