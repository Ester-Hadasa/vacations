import { useContext, useEffect, useState } from "react";
import "./EditVacation.css";
import vacationsContext from "../../../contexts/vacationsContext/vacationsContext";
import Vacation from "../../../model/vacationModel";
import { useForm } from "react-hook-form";
import useVacations from "../../../Service/useVacations";
import { useNavigate } from "react-router-dom";

function EditVacation() {

    const navTo = useNavigate();
    const id = +window.location.pathname.split("/")[2];
    const { getOneVacation, editVacation } = useVacations();
    const { vacations } = useContext(vacationsContext);
    const [vacation, setVacation] = useState(vacations.find((v: Vacation) => v.vacation_id === id))
    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<Vacation>();

    useEffect(() => {
        console.log(vacation);

        if (vacation === undefined) {
            getOneVacation(id).then((v: Vacation) => {
                setVacation(v);

            })
                .catch((err: Error) => {
                    console.log(err);
                    return;
                });
        }
        setValue("destination", vacation?.destination);
        setValue("description", vacation?.description);
        setValue("start_date", vacation?.start_date);
        setValue("end_date", vacation?.end_date);
        setValue("price", vacation?.price);
        setValue("image", vacation?.image_name);
    }, [vacation])

    async function send(vacationData: any) {
        try {
            vacationData.vacation_id = id;
            vacationData.image_name = vacation.image_name;
            await editVacation(vacationData);
            navTo("/vacations");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)}>
                <h2>Edit Vacation</h2>
                <div>
                    <label>destination:</label>
                    <input type="text" name="destination" {...register("destination", { required: true })} />
                    {errors.destination?.type === "required" && <span className="error">destination is required</span>}
                </div>
                <div>
                    <label>description:</label>
                    <input type="text" name="description" {...register("description", { required: true })} />
                    {errors.description?.type === "required" && <span className="error">description is required</span>}
                </div>
                <div>
                    <label>start date:</label>
                    <input type="date" name="start_date" {...register("start_date", {
                        required: true,
                        validate: () => new Date(getValues("start_date")).getTime() < new Date(getValues("end_date")).getTime()
                    })} />
                    {errors.start_date?.type === "required" && <span className="error">start date is required</span>}
                    {errors.start_date?.type === "validate" && <span className="error">Start date must be before the end date</span>}

                </div>
                <div>
                    <label>end date:</label>
                    <input type="date" name="end_date" {...register("end_date", { required: true })} />
                    {errors.end_date?.type === "required" && <span className="error">end date is required</span>}
                </div>
                <div>
                    <label>price:</label>
                    <input type="number" name="price" {...register("price", { required: true, min: 0, max: 10000 })} />
                    {errors.price?.type === "required" && <span className="error">price is required</span>}
                    {errors.price?.type === "min" && <span className="error">A negative price cannot be entered</span>}
                    {errors.price?.type === "max" && <span className="error">Maximum price is 10,000</span>}
                </div>
                <div>
                    <label>image:</label>
                    <input type="file" accept="image" name="image" {...register("image")} />
                </div>
                <input name="image_name" type="hidden" {...register("image_name")} />
                <input name="vacation_id" type="hidden" {...register("vacation_id")} />
                <button>Edit</button>
                <button className="Cancel" onClick={()=> navTo("/vacations")}>Cancel</button>
            </form>
        </div>
    );

}

export default EditVacation;