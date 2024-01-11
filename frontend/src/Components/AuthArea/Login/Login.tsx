import { useForm } from "react-hook-form";
import "./Login.css";
import LoginModel from "../../../model/loginModel";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Service/useAuth";

function Login(): JSX.Element {
    const navTo = useNavigate();
    const {Login} = useAuth()
    async function send(loginData: LoginModel) {
        try {
            await Login(loginData);
            reset();
            navTo("/vacations");
        } catch (error: any) {
            if (error.response?.data)
            setError("email", {
                type: "server",
                message: error.response?.data
            });
            console.log(error);

        } 
    }
    const { register, handleSubmit,formState: { errors }, reset, setError } = useForm<LoginModel>();
    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>
                <div >
                    <label>email:</label>
                    <input type="email" name="email" {...register("email", { required: true })} />
                    {errors.email?.type === "required" && <span className="error">Email is required</span>}

                </div>
                <div >
                    <label>password:</label>
                    <input type="password" name="password"  {...register("password", { required: true ,min:4})} />
                    {errors.password?.type === "required" && <span className="error">Password is required</span>}
                    {errors.password?.type === "min" && <span className="error">Password must be at least 4 characters long</span>}

                </div>
                {errors.email?.type === "server" && <span className="error">{errors.email.message}</span>}

                <button className="button">Login</button>
                <div className="register">
                    don't have account? <br/>
                    <NavLink to="/register">register now</NavLink>
                </div>


            </form>
        </div>
    );
}

export default Login;
