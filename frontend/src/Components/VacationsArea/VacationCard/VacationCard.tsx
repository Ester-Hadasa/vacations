import { NavLink } from "react-router-dom";
import Vacation from "../../../model/vacationModel";
import "./VacationCard.css";
import useVacations from "../../../Service/useVacations";
import appConfig from "../../../Service/appConfig";
import RoleEnum from "../../../model/role-enum";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext/authContext";

function VacationCard(props: { v: Vacation }) {
    const v = props.v;
    const { deleteVacation, followVacation, unfollowVacation } = useVacations();
    const { auth } = useContext(AuthContext);
    const isAdmin = auth.user?.role === RoleEnum.Admin;
    const confirmDelete = (vacation_id: number) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this vacation?");
        if (userConfirmed) {
            deleteVacation(vacation_id);
        }
    };

    return (
        <div className="vacation" key={v.vacation_id}>

            <img src={appConfig.url + v.image_name} alt="" />
            <div>
                <h3>{v.destination}</h3>
                <div className="description">{v.description}</div>
                <h4>🗓️ {new Date(v.start_date).toLocaleDateString('he-IL')}&nbsp;
                    -&nbsp; {new Date(v.end_date).toLocaleDateString('he-IL')}</h4>
                <h4>💵 $ {v.price}</h4>
                {isAdmin ?
                    <>
                        <NavLink className={"buttonAdmin"} to={"/edit_vacation/" + v.vacation_id}>🖋️edit</NavLink>
                        <button className="buttonAdmin" onClick={() => confirmDelete(v.vacation_id)}>🗑️delete</button>
                    </> :
                    <>
                        {
                            v.followed ?
                                <button className="unfollow" onClick={() => unfollowVacation(v.vacation_id)}>{v.followers}🩵 follow</button>
                                :
                                <button className="follow" onClick={() => followVacation(v.vacation_id)}>{v.followers}🩶 follow</button>
                        }

                    </>
                }

            </div>
        </div>
    )

}

export default VacationCard;