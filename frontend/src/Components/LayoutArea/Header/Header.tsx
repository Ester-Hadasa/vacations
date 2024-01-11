import useAuth from "../../../Service/useAuth";
import "./Header.css";


function Header(): JSX.Element {
    const { Logout, auth } = useAuth();
    return (
        <div className="Header">
            <h1>🏖️Vacations </h1>
            {auth.token && <>
                <h2 className="userName">
                    {"Hello" + ", " + auth.user?.first_name + " " + auth.user?.last_name}
                </h2>
                <button onClick={Logout} className="logout-btn">logout</button>
            </>}

        </div>
    );
}

export default Header;
