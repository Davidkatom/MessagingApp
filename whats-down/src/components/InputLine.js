
const InputLine = ({ label, type, placeholder, id }) => {
    return (
        <div class="form-floating mb-3">
            <input type={type} class="form-control" id={id} placeholder={placeholder} />
            <label for={id}>{label}</label>
        </div>
    )
}

export default InputLine