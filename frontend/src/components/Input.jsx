export default function Input({label,type="text",name,placeholder,value,onChange,required=false}){
    return (
        <div>
            <label htmlFor={label}>{label}: </label>
            <input type={type} id={label} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />
        </div>
    )
}