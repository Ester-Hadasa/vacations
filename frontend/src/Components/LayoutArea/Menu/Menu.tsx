import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <nav>
                <NavLink to="/link">link 1</NavLink>
                <NavLink to="/addLink">New link</NavLink>
            </nav>
        </div>
    );
}

export default Menu;
