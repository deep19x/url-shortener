import { useState } from "react"
import Input from "../components/Input"

export default function RegisterPage() {

    const [formData,setFormData] = useState({name:'',email:'',password:''});

    const handleChange = async(e) => {
        setFormData({
            ...formData,      //spreading the data first
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        console.log(formData);
    }

    return (
        <div>
            <h2>Create Your Account</h2>
            <p>Joins us to start creating your own short links</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <Input label={"Name"} placeholder={"Enter your name please"} name={"name"} value={formData.name} onChange={handleChange} required={true} />
                </div>
                <div>
                    <Input label={"Email"} type="email" placeholder={"Enter your email please"} name={"email"}value={formData.email} onChange={handleChange} required={true} />
                </div>
                <div>
                    <Input label={"Password"} type="password" placeholder={"Enter your password please"} name={"password"} value={formData.password} onChange={handleChange} required={true} />
                </div>
                <button type="submit">Register</button>
            </form>

            <p className="auth-switch">
                Already have an account? {/* <Link to="/login">Login here</Link> */}
            </p>
        </div>
    )
}