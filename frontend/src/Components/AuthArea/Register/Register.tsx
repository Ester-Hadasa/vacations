import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../model/userModel";
import useAuth from "../../../Service/useAuth";
import { NavLink } from "react-router-dom";

function Register(): JSX.Element {
    const navTo = useNavigate();
    const { Register } = useAuth();
    async function send(registerData: UserModel) {
        try {
            await Register(registerData);
            reset();
            navTo("/vacations");
        } catch (error: any) {
           // alert(error.response?.data);
            console.log(error);
            if (error.response?.data)
            setError("email", {
                type: "server",
                message: error.response?.data
            });

        }
    }
    const { register, handleSubmit, formState: { errors }, reset ,setError} = useForm<UserModel>();
    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>
                <h2>Register</h2>
                <div>
                    <label>first name:</label>
                    <input type="text" name="first_name" {...register("first_name", { required: true })} />
                    {errors.first_name?.type === "required" && <span className="error">first name is required</span>}

                </div>
                <div>
                    <label>last name:</label>
                    <input type="text" name="last_name" {...register("last_name", { required: true })} />
                    {errors.last_name?.type === "required" && <span className="error">last name is required</span>}

                </div>
                <div>
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
                
                <button className="button">Register</button>

                <div className="login">
                    already a member? <br />
                    <NavLink to="/login">login</NavLink>
                </div>
            </form>

        </div>
    );
}

export default Register;





