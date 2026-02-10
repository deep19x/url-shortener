import { useState } from "react"
import Input from "../components/Input"
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Both email and password are required!");
            return;
        }

        try {
            const response = await loginUser(formData);
            localStorage.setItem('token',response.token);
            alert('Login Successful!');
            navigate('/dashboard');
        } catch (error) {
            const errorMsg = error.error || "Login Failed.Please check your credentials";
            setError(errorMsg);
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Welcome Back!</h2>
            <p>Log in to access your dashboard.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <Input label={"Email"} type="email" placeholder={"Enter your email please"} name={"email"} value={formData.email} onChange={handleChange} required={true} />
                </div>
                <div>
                    <Input label={"Password"} type="password" placeholder={"Enter your password please"} value={formData.password} name={"password"} onChange={handleChange} required={true} />
                </div>
                <button type="submit">Login</button>
            </form>

            {error && <p className="error-msg" style={{ color: "red" }}>{error}</p>}

            <p className="auth-switch">
                Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
        </div>
    )
}