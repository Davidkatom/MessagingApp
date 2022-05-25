
const InputLine = ({ label,value, type, placeholder, id , fun = ()=>{}}) => {
    return (
        <div className="form-floating mb-3">
            <input type={type}  className="form-control" id={id} placeholder={placeholder} onKeyDown={(e) => { e.key == 'Enter' && fun() }}/>
            <label for={id}>{label}</label>
        </div>
    )
}

export default InputLine