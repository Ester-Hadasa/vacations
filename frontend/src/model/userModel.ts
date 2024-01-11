import RoleEnum from "./role-enum";

class UserModel{
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public role: RoleEnum;
}
export default UserModel;