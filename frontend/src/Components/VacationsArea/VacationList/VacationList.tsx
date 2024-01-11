import "./VacationList.css"
import Vacation from "../../../model/vacationModel";
import useVacations from "../../../Service/useVacations";
import VacationCard from "../VacationCard/VacationCard";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext/authContext";
import useAuth from "../../../Service/useAuth";
import RoleEnum from "../../../model/role-enum";
import { NavLink } from "react-router-dom";


function VacationList(): JSX.Element {

    const { getAllVacations, vacations } = useVacations();
    const [isFuture, setIsFuture] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const { auth } = useContext(AuthContext);
    const isAdmin = auth.user?.role === RoleEnum.Admin;

    return (
        <div className="VacationList">

            {isAdmin ? <NavLink className={"addVacation"} to={"/add_vacation"}>🧳 Add Vacation</NavLink> :

                <div className="checkboxes"> sort vacations by:
                    <input type="checkbox" name="future" id="future" checked={isFuture} onChange={e => setIsFuture(e.target.checked)} />
                    <label htmlFor="future">Future</label>
                    <input type="checkbox" name="active" id="active" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
                    <label htmlFor="active">Active</label>
                    <input type="checkbox" name="followed" id="followed" checked={isFollowed} onChange={e => setIsFollowed(e.target.checked)} />
                    <label htmlFor="followed">Followed</label>
                </div>
            }

            <div className="vacations">
                {vacations.map((v: Vacation) => {
                    if (
                        (isActive && (new Date(v.start_date) > new Date() || new Date(v.end_date) < new Date())) ||
                        (isFuture && new Date(v.start_date) < new Date() ) ||
                        (isFollowed && !v.followed)
                    ) {
                        return null;
                    }
                    return <VacationCard v={v} key={v.vacation_id} />
                }
                )}
            </div>
            <button className="load-more-btn" onClick={getAllVacations} >Load more</button>
        </div>
    );
}

export default VacationList;