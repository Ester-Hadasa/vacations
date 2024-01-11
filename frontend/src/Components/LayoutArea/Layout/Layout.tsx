// import Home from "../../HomeArea/Home/Home";
import AuthProvider from "../../../contexts/authContext/authProvide";
import VacationProvider from "../../../contexts/vacationsContext/vacationProvider";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <AuthProvider>
            <VacationProvider>
                <div className="Layout">
                     <header>
                        <Header />
                    </header> 
                    {/* <aside>
                        <Menu />
                    </aside> */}
                    <main>
                        <Routing />
                    </main>
                    {/* <footer>
                        <Footer />
                    </footer> */}
                </div>
            </VacationProvider>
        </AuthProvider>
    );
}

export default Layout;
