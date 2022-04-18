
const Button = ({ color, label, onClick, classy }) => {
    return (
        <button className={classy} onClick={onClick} type="button" style={{ backgroundColor: color }}> {label}</button >
    )
}



export default Button