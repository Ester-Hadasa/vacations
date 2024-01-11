import axios from "axios";
import LoginModel from "../model/loginModel";
import RegisterModel from "../model/userModel";
import appConfig from "./appConfig";
import { useContext } from "react";
import AuthContext from "../contexts/authContext/authContext";
import { AuthActionType } from "../contexts/authContext/authReducer";


function useAuth(){
    const {auth, setAuth} = useContext(AuthContext);
    
    async function Login(loginData:LoginModel){
        const result= await axios.post(appConfig.login, loginData);
        const token=result.data.token;
        setAuth({type: AuthActionType.Login, payload: token})
    }

    async function Register(registerData:RegisterModel){
        const result= await axios.post(appConfig.register, registerData);
        const token=result.data.token;
        setAuth({type: AuthActionType.Register, payload: token})
    }    

    function Logout(){
        setAuth({type: AuthActionType.Logout})
    }

    return {auth, Login, Register, Logout}
}

export default useAuth;