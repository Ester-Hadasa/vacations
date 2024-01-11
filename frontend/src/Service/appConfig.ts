class AppConfig{
    public url = "http://localhost:4000/";

    public api = this.url + "api/";
    public vacations = this.api + "vacations";
    public getOneVacation = this.api + "vacation";
    public follow = this.vacations + "/follow";
    public unfollow = this.vacations + "/unfollow";

    public auth = this.api + "auth/";
    public login = this.auth + "login";
    public register = this.auth + "register";
}

const appConfig = new AppConfig();
export default appConfig;