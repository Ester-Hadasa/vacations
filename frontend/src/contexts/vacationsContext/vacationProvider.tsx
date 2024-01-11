import { PropsWithChildren, useContext, useEffect, useState } from "react";
import vacationsContext from "./vacationsContext";
import AuthContext from "../authContext/authContext";
import axios from "axios";
import appConfig from "../../Service/appConfig";

function VacationProvider(props: PropsWithChildren){
    const [vacations, setVacations] = useState([]);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        if(auth.token){
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization =  `Bearer ${auth.token}`;
                return config;
            });

            axios.get(appConfig.vacations + "?user_id=" + auth.user?.user_id)
            .then(res => {
                setVacations(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }

    }, [auth]);

    return (
        <vacationsContext.Provider value={{vacations, setVacations}}>
            {props.children}
        </vacationsContext.Provider>
    )
}

export default VacationProvider;