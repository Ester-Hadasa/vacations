import { useNavigate } from "react-router-dom";
import "./AddVacation.css"
import useVacations from "../../../Service/useVacations";
import Vacation from "../../../model/vacationModel";
import { useForm } from "react-hook-form";

function AddVacation() {
    const navTo = useNavigate();
    const { addVacation } = useVacations();

    async function send(vacationData: any) {
        try {
            await addVacation(vacationData);
            navTo("/vacations");
        }
        catch (err) {
            console.log(err);
        }
    }
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<Vacation>();

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <h2>Add Vacation</h2>
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
                    <input type="date" name="start_date"  {...register("start_date", {
                        required: "Start date is required",
                        validate: (value) => {
                            const today = new Date();
                            const startDate = new Date(value);
                            // Check if start date is today or in the future
                            const isStartDateValid = startDate >= today;
                            if (!isStartDateValid) { return "Start date must be today or in the future"; }
                            // Check if start date is before end date
                            const isEndDateValid = startDate.getTime() <= new Date(getValues("end_date")).getTime();
                            if (!isEndDateValid) { return "Start date must be before the end date"; }
                            return true;
                        },
                    })} />
                    {errors.start_date && <span className="error">{errors.start_date.message}</span>}
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
                    <input type="file" name="image" {...register("image", { required: true })} />
                    {errors.image?.type === "required" && <span className="error">image is required</span>}
                </div>

                <button>Add</button>
                <button className="Cancel" onClick={() => navTo("/vacations")}>Cancel</button>
            </form>
        </div>
    )
}

export default AddVacation;