import { useState } from "react"
import Input from "../components/Input"

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();



        console.log(email);
    }

    return (
        <div>
            <h2>Welcome Back!</h2>
            <p>Log in to access your dashboard.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <Input label={"Email"} type="email" placeholder={"Enter your email please"} value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </div>
                <div>
                    <Input label={"Password"} type="password" placeholder={"Enter your password please"} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                </div>
                <button type="submit">Register</button>
            </form>

            <p className="auth-switch">
                Don't have an account? {/* <Link to="/register">Register now</Link> */}
            </p>
        </div>
    )
}