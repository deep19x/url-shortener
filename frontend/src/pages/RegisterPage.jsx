import { useState } from "react"
import Input from "../components/Input"
import { registerUser } from "../services/authService";
import {Link, useNavigate} from "react-router-dom"

export default function RegisterPage() {

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleChange = async (e) => {
        setFormData({
            ...formData,      //spreading the data first
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await registerUser(formData);
            console.log("Registration Successful: ", response);
            setSuccess("Registration Successful! Please log in.")
            setFormData({ name: "", email: "", password: "" });
            navigate('/login');
        } catch (error) {
            const errorMessage = err.error || 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error('Registration error:', err);
        }
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
                    <Input label={"Email"} type="email" placeholder={"Enter your email please"} name={"email"} value={formData.email} onChange={handleChange} required={true} />
                </div>
                <div>
                    <Input label={"Password"} type="password" placeholder={"Enter your password please"} name={"password"} value={formData.password} onChange={handleChange} required={true} />
                </div>
                <button type="submit">Register</button>
            </form>

            {error && <p className="error-msg" style={{color:"red"}}>{error}</p>}
            {success && <p className="success-msg" style={{color:"green"}}>{success}</p>}

            <p className="auth-switch">
                Already have an account? <Link to={"/login"}>Login</Link>
            </p>
        </div>
    )
}