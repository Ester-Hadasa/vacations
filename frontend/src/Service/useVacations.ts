import { useContext } from "react";
import vacationsContext from "../contexts/vacationsContext/vacationsContext";
import appConfig from "./appConfig";
import axios from "axios";
import Vacation from "../model/vacationModel";
import AuthContext from "../contexts/authContext/authContext";

function useVacations() {
    const { vacations, setVacations } = useContext(vacationsContext);
    const { auth } = useContext(AuthContext)

    async function getAllVacations() {
        try {
            const result = await axios.get(appConfig.vacations + "?offset=" + vacations.length + "&user_id=" + auth.user?.user_id);
            const newVacations = result.data;
            console.log(vacations, newVacations);

            if (newVacations.length === 0) {
                alert("No more vacations to show");
                return;
            }

            setVacations([...vacations, ...newVacations]);
        } catch (error) {
            console.log(error);

        }
    }

    async function getOneVacation(id: number) {
        const result = await axios.get(`${appConfig.getOneVacation}/${id}`);
        return result.data;
    }

    async function addVacation(vacation: Vacation) {
        try {
            const formData = new FormData();
            formData.append("destination", vacation.destination);
            formData.append("description", vacation.description);
            formData.append("start_date", new Date(vacation.start_date).toISOString());
            formData.append("end_date", new Date(vacation.end_date).toISOString());
            formData.append("price", vacation.price.toString());
            formData.append("image", vacation.image[0]);

            const result = await axios.post(appConfig.vacations, formData);
            const newVacation = result.data;
            console.log(newVacation);

            setVacations([...vacations, newVacation]);
        } catch (error) {
            console.log(error);

        }

    }


    async function editVacation(updatedVacation: Vacation) {
        const formData = new FormData();
        formData.append("vacation_id", updatedVacation.vacation_id.toString());
        formData.append("image_name", updatedVacation.image_name);
        formData.append("destination", updatedVacation.destination);
        formData.append("description", updatedVacation.description);
        formData.append("start_date", new Date(updatedVacation.start_date).toISOString());
        formData.append("end_date", new Date(updatedVacation.end_date).toISOString());
        formData.append("price", updatedVacation.price.toString());
        formData.append("image", updatedVacation.image[0]);

        const result = await axios.put(appConfig.vacations, formData);
        const vacation = result.data;
        const updatedVacations = vacations.map((v: Vacation) => {
            console.log(v.vacation_id);

            if (v.vacation_id === vacation.vacation_id) {
                return vacation;
            }
            return v;
        });

        setVacations(updatedVacations);
    }

    async function deleteVacation(vacation_id: number) {
        try {
            await axios.delete(`${appConfig.vacations}/${vacation_id}`);
            const updatedVacations = vacations.filter((v: Vacation) => v.vacation_id !== vacation_id);
            setVacations(updatedVacations);
        } catch (error) {
            console.log(error);
        }

    }

    async function followVacation(vacation_id: number) {
        try {
            await axios.post(appConfig.follow, { vacation_id, user_id: auth.user?.user_id });
            const updatedVacations = vacations.map((v: Vacation) => {
                if (v.vacation_id === vacation_id) {
                    v.followers++;
                    v.followed = true;
                }
                return v;
            });
            setVacations(updatedVacations);
        } catch (error) {
            console.log(error);
        }
    }

    async function unfollowVacation(vacation_id: number) {
        try {
            await axios.post(appConfig.unfollow, { vacation_id, user_id: auth.user?.user_id });
            const updatedVacations = vacations.map((v: Vacation) => {
                if (v.vacation_id === vacation_id) {
                    v.followers--;
                    v.followed = false;
                }
                return v;
            });
            setVacations(updatedVacations);
        } catch (error) {
            console.log(error);
        }
    }
    return { vacations, getAllVacations, getOneVacation, addVacation, editVacation, deleteVacation, followVacation, unfollowVacation }
}

export default useVacations;