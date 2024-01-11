import { PropsWithChildren, useState, useReducer } from "react";
import { AuthState, authReducer } from "./authReducer";
import AuthContext from "./authContext";

function AuthProvider(props: PropsWithChildren){
    const [auth, setAuth] = useReducer(authReducer, new AuthState())

    return (
        <AuthContext.Provider value={{auth, setAuth}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;