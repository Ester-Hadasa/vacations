class Vacation {
    public vacation_id: number;
    public destination: string;
    public description: string;
    public start_date: Date;
    public end_date: Date;
    public price: number;
    public image_name: string;
    public image: FileList;
    public followers: number;
    public followed: boolean;



    constructor(vacation: Vacation) {
        this.vacation_id = vacation.vacation_id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price = vacation.price;
        this.image_name = vacation.image_name;
        this.image = vacation.image;
        this.followers = vacation.followers;
        this.followed = vacation.followed;
    }
}

export default Vacation;

