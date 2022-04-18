
const InputLine = ({ label, type, placeholder, id }) => {
    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" id={id} placeholder={placeholder} />
            <label for={id}>{label}</label>
        </div>
    )
}

export default InputLine