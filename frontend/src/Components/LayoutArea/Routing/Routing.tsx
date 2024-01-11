import { Routes, Route, Navigate } from 'react-router';
import Login from '../../AuthArea/Login/Login';
import Register from '../../AuthArea/Register/Register';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/authContext/authContext';
import RouteNotFound from '../RouteNotFound/RouteNotFound';
import VacationList from '../../VacationsArea/VacationList/VacationList';
import AddVacation from '../../VacationsArea/AddVacation/AddVacation';
import EditVacation from '../../VacationsArea/EditVacation/EditVacation';


function Routing() {

    const {auth} = useContext(AuthContext);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        
        setIsRegistered(auth.token);
        console.log(isRegistered);

    }, [auth])

    return (
        <Routes>
            {
                isRegistered ?
                <>
                    <Route path="/vacations" element={<VacationList />} />
                    <Route path="/add_vacation" element={<AddVacation />} />
                    <Route path="/edit_vacation/:id" element={<EditVacation />} />
                    <Route path="/login" element={<Navigate to={"/vacations"}  />} />

                </> : 
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/vacations" element={<Navigate to={"/login"}  />} />
                </>
            }
            <Route path="/" element={isRegistered ? <Navigate to="/vacations" /> : <Navigate to="/login" />} />
            <Route path="*" element={<RouteNotFound />} />
        </Routes>
    );
}

export default Routing;